import { Size, Variant } from "./button.type";

export const baseStyles =
  "inline-flex items-center cursor-pointer justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-foreground hover:bg-primary/40",
  outline:
    "border border-primary hover:bg-primary text-primary hover:text-foreground",
  ghost: "bg-transparent hover:bg-primary/20 text-primary",
};

export const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
