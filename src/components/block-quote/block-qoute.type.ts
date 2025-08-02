import { ReactNode } from "react";

export interface BlockquoteProps {
  children: ReactNode;
  author?: string;
  cite?: string;
  icon?: boolean;
  className?: string;
  border?: boolean;
}
