import {
  useQuery as _useQuery,
  type QueryObserverOptions
} from "@tanstack/react-query";
import { useCubes } from "../../context";

export type RequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | string[]>;
  customApiUrl?: string;
};

const buildQueryString = (params?: RequestOptions["params"]): string => {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const useQuery = <T>(
  options: RequestOptions,
  queryConfig?: Omit<QueryObserverOptions<T>, "queryKey" | "queryFn">
) => {
  const { apiUrl: contextApiUrl, getToken, onUnauthorized } = useCubes();

  const finalApiUrl = options.customApiUrl ?? contextApiUrl;

  const queryKey = [
    options.endpoint,
    options.params ?? null,
    options.method ?? "GET",
  ];

  const fetchFn = async (): Promise<T> => {
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = {
      ...(getToken?.() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    };

    if (!isFormData && options.method !== "GET") {
      headers["Content-Type"] = "application/json";
    }

    const query = buildQueryString(options.params);
    const res = await fetch(`${finalApiUrl}${options.endpoint}${query}`, {
      method: options.method || "GET",
      headers,
      body: isFormData
        ? (options.body as FormData)
        : options.body
        ? JSON.stringify(options.body)
        : undefined,
    });

    if (res.status === 401) {
      onUnauthorized?.();
      throw new Error("Unauthorized");
    }

    if (res.status === 204) {
      return null as unknown as T;
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API ${res.status}: ${res.statusText} - ${errorText}`);
    }

    return res.json();
  };

  return _useQuery<T>({
    queryKey,
    queryFn: fetchFn,
    ...queryConfig,
  });
};
