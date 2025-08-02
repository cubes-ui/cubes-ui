import { cn } from "../../utils";
import { LabelProps } from "./label.type";

export const Label = ({ children, htmlFor, className }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
  >
    {children}
  </label>
);