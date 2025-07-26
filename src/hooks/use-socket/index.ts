import { useEffect, useRef, useState, useCallback } from "react";

import { useCubes } from "../../context";
import { useRequest } from "../use-request";

type Listener = (event: MessageEvent) => void;

interface UseSocketOptions {
  queryEndpoint: string;
  queryParams?: Record<string, string | number | boolean | string[]>;
  protocols?: string | string[];
  autoReconnect?: boolean;
}

export const useSocket = ({
  queryEndpoint,
  queryParams,
  protocols,
  autoReconnect = true,
}: UseSocketOptions) => {
  const { getToken, onUnauthorized } = useCubes();
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const listenersRef = useRef<Record<string, Listener[]>>({});

  const [readyState, setReadyState] = useState<WebSocket["readyState"]>(
    WebSocket.CLOSED
  );
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

  const { data, isLoading, error } = useRequest<{
    socketUrl: string;
  }>("query", {
    endpoint: queryEndpoint,
    params: queryParams,
    method: "GET",
  });

  const connect = useCallback(() => {
    if (!data?.socketUrl) return;

    socketRef.current = new WebSocket(data.socketUrl, protocols);

    socketRef.current.onopen = () => {
      reconnectAttempts.current = 0;
      setReadyState(WebSocket.OPEN);
    };

    socketRef.current.onmessage = (event) => {
      setLastMessage(event);
      const topic = event.type || "default";
      listenersRef.current[topic]?.forEach((fn) => fn(event));
    };

    socketRef.current.onclose = () => {
      setReadyState(WebSocket.CLOSED);
      if (autoReconnect && reconnectAttempts.current < 5) {
        reconnectAttempts.current++;
        setTimeout(connect, reconnectAttempts.current * 1000);
      }
    };

    socketRef.current.onerror = (err) => {
      console.warn("WebSocket error:", err);
    };
  }, [data?.socketUrl, protocols, autoReconnect]);

  useEffect(() => {
    if (data?.socketUrl) connect();
    return () => socketRef.current?.close();
  }, [data?.socketUrl, connect]);

  const sendMessage = useCallback(
    (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
      } else {
        console.warn("WebSocket is not open.");
      }
    },
    []
  );

  const subscribe = useCallback((topic: string, fn: Listener) => {
    listenersRef.current[topic] = [...(listenersRef.current[topic] || []), fn];
  }, []);

  const unsubscribe = useCallback((topic: string, fn: Listener) => {
    listenersRef.current[topic] = (listenersRef.current[topic] || []).filter(
      (l) => l !== fn
    );
  }, []);

  return {
    isLoading,
    error,
    readyState,
    lastMessage,
    sendMessage,
    subscribe,
    unsubscribe,
  };
};
