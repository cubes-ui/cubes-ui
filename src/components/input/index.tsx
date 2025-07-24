import { forwardRef } from "react";
import { cn } from "../../utils";
import {
  inputBaseStyles,
  inputSizeStyles,
  inputVariantStyles,
} from "./input.style";
import { InputProps } from "./input.type";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", inputSize = "md", className, ...rest }, ref) => {
    const composedClassName = cn(
      inputBaseStyles,
      inputVariantStyles[variant] ?? inputVariantStyles.default,
      inputSizeStyles[inputSize] ?? inputSizeStyles.md,
      className
    );

    return <input ref={ref} {...rest} className={composedClassName} />;
  }
);

Input.displayName = "Input";
