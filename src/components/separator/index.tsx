import { cn } from "../../utils";
import { SeparatorProps } from "./separator.type";

export const Separator = ({
  orientation = "horizontal",
  className,
}: SeparatorProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        isHorizontal ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  );
};
