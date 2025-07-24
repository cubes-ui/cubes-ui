import { Size, Variant } from "./button.type";

export const baseStyles =
  "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm";

export const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-white hover:bg-primary/90",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
};

export const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};
