export type ToastVariant = "success" | "error" | "info";
export type ToastStyle = "solid" | "ghost";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center";

export interface ToastOptions {
  message: string;
  variant: ToastVariant;
  duration?: number;
  style?: ToastStyle;
  location?: ToastPosition;
}

type ShowToastFn = (options: ToastOptions) => void;

let showToast: ShowToastFn = () => {};

export const toast = {
  success: (
    message: string,
    config?: Partial<Omit<ToastOptions, "message" | "variant">>
  ) => showToast({ message, variant: "success", ...config }),

  error: (
    message: string,
    config?: Partial<Omit<ToastOptions, "message" | "variant">>
  ) => showToast({ message, variant: "error", ...config }),

  info: (
    message: string,
    config?: Partial<Omit<ToastOptions, "message" | "variant">>
  ) => showToast({ message, variant: "info", ...config }),

  _register(fn: ShowToastFn) {
    showToast = fn;
  },
};
