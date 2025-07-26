import {
  useQuery as _useQuery,
  useMutation as _useMutation,
  type QueryObserverOptions,
  type MutationOptions,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useCubes } from "../../context";

export type RequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean | string[]>;
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

const requestFn = async <T>(
  options: RequestOptions,
  getToken?: () => string | undefined,
  onUnauthorized?: () => void
): Promise<T> => {
  const finalApiUrl = options.customApiUrl ?? "";
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

type Mode = "query" | "mutation";

export function useRequest<TData = unknown, TVariables = RequestOptions>(
  mode: "query",
  options: RequestOptions,
  queryConfig?: Omit<QueryObserverOptions<TData>, "queryKey" | "queryFn">
): UseQueryResult<TData>;

export function useRequest<TData = unknown, TVariables = RequestOptions>(
  mode: "mutation",
  options?: MutationOptions<TData, Error, TVariables>
): UseMutationResult<TData, Error, TVariables>;

export function useRequest<TData = unknown, TVariables = RequestOptions>(
  mode: Mode,
  options?: any,
  queryConfig?: any
): any {
  const { apiUrl, getToken, onUnauthorized } = useCubes();

  if (mode === "query") {
    const finalOptions = {
      ...options,
      customApiUrl: options.customApiUrl ?? apiUrl,
    };

    const queryKey = [
      options.endpoint,
      options.params ?? null,
      options.method ?? "GET",
    ];

    return _useQuery<TData>({
      queryKey,
      queryFn: () => requestFn<TData>(finalOptions, getToken, onUnauthorized),
      ...queryConfig,
    });
  }

  if (mode === "mutation") {
    return _useMutation<TData, Error, TVariables>({
      mutationFn: (vars: TVariables) =>
        requestFn<TData>(
          {
            ...(vars as RequestOptions),
            customApiUrl: (vars as RequestOptions).customApiUrl ?? apiUrl,
          },
          getToken,
          onUnauthorized
        ),
      ...options,
    });
  }

  throw new Error(`Unsupported mode: ${mode}`);
}
