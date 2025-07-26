import { ChangeEvent, TextareaHTMLAttributes } from "react";

export type TextareaVariant = "default" | "outline" | "ghost";
export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "size" | "value" | "onChange"
  > {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  variant?: TextareaVariant;
  inputSize?: TextareaSize;
  className?: string;
}
