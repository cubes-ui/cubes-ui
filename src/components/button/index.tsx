import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils";
import { baseStyles, sizeStyles, variantStyles } from "./button.style";
import { ButtonProps } from "./button.type";

export function Button(props: ButtonProps) {
  const {
    variant = "default",
    size = "lg",
    className,
    children,
    as = "button",
    ...rest
  } = props;

  const composedClassName = cn(
    baseStyles,
    variantStyles[variant] ?? variantStyles.default,
    sizeStyles[size] ?? sizeStyles.lg,
    className
  );

  if (as === "a") {
    const { href, ...anchorProps } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href!} {...anchorProps} className={composedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={composedClassName}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
