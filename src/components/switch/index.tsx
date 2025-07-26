import { useId } from "react";
import { switchSizeStyles } from "./switch.style";
import { SwitchProps } from "./switch.type";

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  size = "md",
  label,
  className,
}: SwitchProps) => {
  const id = useId();
  const { trackWidth, trackHeight, thumbSize, translateX } =
    switchSizeStyles[size];

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className || ""}`}
    >
      <div
        className={`relative rounded-full transition-colors duration-200 ease-linear
          ${trackWidth} ${trackHeight}
          ${checked ? "bg-primary" : "bg-gray-300"}
        `}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          aria-hidden="true"
        />
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-1 bg-white rounded-full shadow-md
            transform transition-transform duration-200 ease-linear
            ${thumbSize}
            ${checked ? translateX : "translate-x-0"}
          `}
        />
      </div>
      {label && (
        <span className="text-sm font-medium select-none user-select-none">
          {label}
        </span>
      )}
    </label>
  );
};
