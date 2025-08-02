import { Size } from "./avatar.type";

export const sizeClasses: Record<Size, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

export const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
};
