import { RadioSize, RadioVariant } from "./radio.type";

export const radioBaseStyles =
  "flex items-center gap-3 rounded transition-all duration-200 cursor-pointer select-none";

export const radioSizeStyles: Record<RadioSize, string> = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
};

export const radioVariantStyles: Record<RadioVariant, string> = {
  default: "border border-gray-300 text-gray-800 hover:border-gray-400",
  outline: "border border-primary  text-gray-800",
  ghost: "border-transparent text-muted",
};