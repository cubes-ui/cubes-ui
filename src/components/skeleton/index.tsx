import { cn } from "../../utils";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse h-5 bg-gray-300 rounded", className)}></div>
);
