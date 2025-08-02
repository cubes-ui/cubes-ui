import { ElementType, ReactNode } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "blockquote"
  | "small"
  | "lead"
  | "muted"
  | "code";
export interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}
