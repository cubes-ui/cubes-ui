import { cn } from "../../utils";
import { StackProps } from "./stack.type";

export const Stack = ({
  children,
  direction = "col",
  gap = 4,
  align,
  justify,
  className,
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(
        `flex flex-${direction} gap-${gap}`,
        align && `items-${align}`,
        justify && `justify-${justify}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
