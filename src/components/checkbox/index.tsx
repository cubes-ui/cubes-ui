import { cn } from "../../utils";
import { checkboxBaseStyles, checkboxSizeStyles } from "./checkbox.style";
import { CheckboxProps } from "./checkbox.type";

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
  className,
}: CheckboxProps) => {
  const composedClass = cn(
    checkboxBaseStyles,
    "text-gray-800 hover:text-black",
    checkboxSizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <label className={composedClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          "accent-primary w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition",
          disabled ? "bg-gray-200" : "bg-white"
        )}
      />
      {label && <span className="leading-tight">{label}</span>}
    </label>
  );
};
