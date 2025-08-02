import { cn } from "../../utils";
import { baseStyles, sizeStyles, variantStyles } from "./icon-button.style";
import { IconButtonProps } from "./icon-button.type";

export const IconButton = ({
  icon,
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon ?? children}
    </button>
  );
};