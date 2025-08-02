import { ReactNode } from "react";

export type Position = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: Position;
}
