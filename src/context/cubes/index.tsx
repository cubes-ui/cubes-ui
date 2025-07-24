import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { env } from "../../utils/env";
import { ToastProvider } from "../toast";
export type CubesContextType = {
  apiUrl?: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
};
const queryClient = new QueryClient();

const CubesContext = createContext<CubesContextType | undefined>(undefined);

export const CubesProvider = ({
  children,
  ...values
}: React.PropsWithChildren<CubesContextType>) => {
  return (
    <CubesContext.Provider value={values}>
      <ToastProvider />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CubesContext.Provider>
  );
};

export const useCubes = (): Required<CubesContextType> => {
  const context = useContext(CubesContext);
  if (!context) {
    throw new Error("useCubesContext must be used within a CubesProvider");
  }

  const resolvedApiUrl = context.apiUrl ?? env.apiUrl;

  return {
    apiUrl: resolvedApiUrl,
    getToken: context.getToken!,
    onUnauthorized: context.onUnauthorized!,
  };
};
