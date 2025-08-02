import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils";
import { Button } from "../button";
import { sizeStyles } from "./color-picker.style";
import { ColorPickerProps } from "./color-picker.type";

export function ColorPicker({
  colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#FCD34D",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
  ],
  value,
  defaultValue,
  onChange,
  size = "md",
  className,
}: ColorPickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const selectedColor = value !== undefined ? value : internalValue;

  const handleSelect = (color: string) => {
    if (value === undefined) setInternalValue(color);
    onChange?.(color);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="list">
      {colors.map((color) => {
        const isSelected = color === selectedColor;

        return (
          <Button
            key={color}
            type="button"
            onClick={() => handleSelect(color)}
            aria-label={`Select color ${color}`}
            aria-pressed={isSelected}
            className={cn(
              sizeStyles[size],
              "rounded-full border-2 p-2 transition-shadow focus:outline-none focus:ring-2",
              isSelected
                ? "ring-2 ring-primary ring-offset-2 ring-offset-white border-transparent shadow-md"
                : "border-gray-300"
            )}
            style={{ backgroundColor: color }}
          >
            {/* Show a checkmark if selected */}
            {isSelected && <Check size={24} className="text-primary-900" />}
          </Button>
        );
      })}
    </div>
  );
}
