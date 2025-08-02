import { cn } from "../../utils";
import { GridProps } from "./grid.type";

export const Grid = ({
  children,
  cols = 1,
  gap = 4,
  sm,
  md,
  lg,
  xl,
  x2l,
  className,
  ...props
}: GridProps) => {
  const breakpoints: [string, number | undefined][] = [
    ["sm", sm],
    ["md", md],
    ["lg", lg],
    ["xl", xl],
    ["2xl", x2l],
  ];
  const breakpointClasses = breakpoints
    .map(([prefix, count]) => (count ? `${prefix}:grid-cols-${count}` : ""))
    .filter(Boolean);

  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols}`,
        `gap-${gap}`,
        ...breakpointClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
