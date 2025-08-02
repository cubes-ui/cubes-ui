import { LucideIcon } from "lucide-react";

export type ProgressVariant = "default" | "outline" | "ghost";

export interface ProgressCardProps {
  title: string;
  value: number;
  max?: number;
  variant?: ProgressVariant;
  circle?: boolean;
  showLabel?: boolean;
  icon?: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}
