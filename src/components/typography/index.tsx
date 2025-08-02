import { ElementType } from "react";
import { cn } from "../../utils";
import { typographyStyles } from "./typography.style";
import { validTags } from "./Typography.tags";
import { TypographyProps } from "./typography.type";

export const Typography = ({
  variant,
  children,
  className,
  as,
}: TypographyProps) => {
  const Component = (as || validTags[variant] || "span") as ElementType;

  return (
    <Component className={cn(typographyStyles[variant], className)}>
      {children}
    </Component>
  );
};
