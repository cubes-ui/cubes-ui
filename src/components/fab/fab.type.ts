import { ReactNode } from "react";

export interface FABProps {
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  placement?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}