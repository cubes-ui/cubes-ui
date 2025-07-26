import { CheckboxSize } from "./checkbox.type";

export const checkboxBaseStyles =
  "inline-flex items-center gap-3 cursor-pointer transition-all duration-200 select-none";

export const checkboxSizeStyles: Record<CheckboxSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};