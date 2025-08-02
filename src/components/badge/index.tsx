import { X } from "lucide-react";
import { cn } from "../../utils";
import { badgeBaseStyle, badgeVariantStyles } from "./badge.style";
import { BadgeProps } from "./badge.type";

export function Badge({
  children,
  variant = "default",
  removable = false,
  onRemove,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cn(badgeBaseStyle, badgeVariantStyles[variant], className)}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-2 hover:text-gray-600 focus:outline-none"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
