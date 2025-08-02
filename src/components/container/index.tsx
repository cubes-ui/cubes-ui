import { cn } from "../../utils";
import { sizes } from "./container.style";
import { ContainerProps } from "./container.type";

export const Container = ({
  children,
  size = "full",
  className,
  ...props
}: ContainerProps) => {
  return (
    <div className={cn("mx-auto px-4", sizes[size], className)} {...props}>
      {children}
    </div>
  );
};
