import { Size, Variant } from "./icon-button.type";

export const baseStyles = "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

export const variantStyles: Record<Variant, string> = {
  default: "bg-primary-800 text-white hover:bg-primary-700 focus:ring-primary-500",
  outline: "border border-primary-300 text-primary-800 hover:bg-primary-100 focus:ring-primary-400",
  ghost: "text-primary-800 hover:bg-primary-100 focus:ring-primary-400",
};

export const sizeStyles: Record<Size, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};