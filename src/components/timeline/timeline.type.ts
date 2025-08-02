import { ReactNode } from "react";

export interface TimelineItem {
  title: string;
  description?: string;
  icon?: ReactNode;
  time?: string;
  status?: "completed" | "in-progress" | "skipped";
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}