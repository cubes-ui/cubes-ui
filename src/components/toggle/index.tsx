import { useState } from "react";
import { cn } from "../../utils";
import { baseClasses, disabledClasses, variantClasses } from "./toggle.style";
import { ToggleButtonProps } from "./toggle.type";

export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  className,
  variant = "solid",
  disabled = false,
  children,
}: ToggleButtonProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = typeof checked === "boolean";
  const isActive = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (disabled) return;
    if (!isControlled) setInternalChecked((prev) => !prev);
    onChange?.(!isActive);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant][isActive ? "on" : "off"],
        disabled && disabledClasses,
        className
      )}
    >
      {children ?? (isActive ? "On" : "Off")}
    </button>
  );
}
