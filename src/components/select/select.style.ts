import { SelectSize, SelectVariant } from "./select.type";

export const selectBaseStyles =
  "block w-full rounded-md border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export const selectVariantStyles: Record<SelectVariant, string> = {
  default: "border-gray-300 focus:ring-primary",
  outline: "border-primary focus:ring-primary",
  ghost: "border-transparent bg-transparent focus:ring-primary",
};

export const selectSizeStyles: Record<SelectSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};

export const selectMenuStyles =
  "absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto";
