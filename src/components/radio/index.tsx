import { cn } from "../../utils";
import {
  radioBaseStyles,
  radioSizeStyles,
  radioVariantStyles,
} from "./radio.style";
import { RadioProps } from "./radio.type";

export const Radio = ({
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
  variant = "default",
  className,
}: RadioProps) => {
  const composedClass = cn(
    radioBaseStyles,
    radioSizeStyles[size],
    radioVariantStyles[variant],
    checked && "ring-2 ring-primary ring-offset-1 bg-primary/5",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <label className={composedClass}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 bg-primary"
      />
      {label && <span className="leading-tight">{label}</span>}
    </label>
  );
};
