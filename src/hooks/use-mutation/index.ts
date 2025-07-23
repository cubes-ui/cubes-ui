import {
  useMutation as _useMutation,
  type MutationOptions,
} from "@tanstack/react-query";
import { useCubes } from "../../context";

export type MutationRequestOptions = {
  endpoint: string;
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | string[]>;
  customApiUrl?: string;
};

const buildQueryString = (
  params?: MutationRequestOptions["params"]
): string => {
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

export const useMutation = <
  TData = unknown,
  TVariables extends MutationRequestOptions = MutationRequestOptions
>(
  mutationConfig?: Omit<MutationOptions<TData, Error, TVariables>, "mutationFn">
) => {
  const { apiUrl: contextApiUrl, getToken, onUnauthorized } = useCubes();

  const mutationFn = async (options: TVariables): Promise<TData> => {
    const finalApiUrl = options.customApiUrl ?? contextApiUrl;

    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
      ...(getToken?.() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    };

    if (!isFormData && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const query = buildQueryString(options.params);

    const res = await fetch(`${finalApiUrl}${options.endpoint}${query}`, {
      method: options.method || "POST",
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

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API ${res.status}: ${res.statusText} - ${errorText}`);
    }

    return res.json();
  };

  return _useMutation<TData, Error, TVariables>({
    mutationFn,
    ...mutationConfig,
  });
};
