import { ChangeEvent, InputHTMLAttributes } from "react";

export type InputVariant = "default" | "outline" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  inputSize?: InputSize;
  className?: string;
}
