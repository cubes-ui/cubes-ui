import { TextareaSize, TextareaVariant } from "./textarea.type";

export const textareaBaseStyles =
  "block w-full rounded-md border !resize-none transition-all !overflow-hidden min-h-10 duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export const textareaVariantStyles: Record<TextareaVariant, string> = {
  default: "border-gray-300 focus:ring-primary",
  outline: "border border-primary focus:ring-primary",
  ghost: "border-transparent bg-transparent focus:ring-primary",
};

export const textareaSizeStyles: Record<TextareaSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};