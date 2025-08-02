import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils";
import { RatingProps } from "./rating.type";

export const Rating = ({
  value,
  onChange,
  max = 5,
  size = 24,
  readOnly = false,
  className,
}: RatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? value;

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < displayValue;

        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(i + 1)}
            onMouseEnter={() => !readOnly && setHovered(i + 1)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={cn(
              "transition-transform p-1 hover:scale-110 focus:outline-none",
              readOnly && "cursor-default"
            )}
            aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
          >
            <Star
              className={cn(
                "transition-colors",
                filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
              width={size}
              height={size}
            />
          </button>
        );
      })}
    </div>
  );
};
