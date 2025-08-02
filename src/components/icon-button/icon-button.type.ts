import { ButtonHTMLAttributes, ReactNode } from "react";

export type Variant = "default" | "outline" | "ghost";
export type Size = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}