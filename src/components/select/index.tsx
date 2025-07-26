import { cn, useClickOutside } from "cubes-ui";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { selectBaseStyles, selectMenuStyles, selectSizeStyles, selectVariantStyles } from "./select.style";
import { SelectProps } from "./select.type";

export const Select = ({
  options,
  selected,
  onSelect,
  placeholder = "Select...",
  variant = "default",
  selectSize = "md",
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === selected);
  const enabledOptions = options.filter((o) => !o.disabled);

  const rootRef = useRef<HTMLDivElement>(null);
  useClickOutside(rootRef as React.RefObject<HTMLDivElement>, () =>
    setOpen(false)
  );

  useEffect(() => {
    if (!open || activeIndex === null || !listRef.current) return;
    const items = listRef.current.querySelectorAll("li");
    const el = items[activeIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) return;
    const navigableIndices = options
      .map((opt, i) => (opt.disabled ? null : i))
      .filter((i): i is number => i !== null);

    const currentActive = activeIndex ?? navigableIndices[0];
    const currentPos = navigableIndices.indexOf(currentActive);
    const maxPos = navigableIndices.length - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextPos = currentPos < maxPos ? currentPos + 1 : 0;
      setActiveIndex(navigableIndices[nextPos]);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevPos = currentPos > 0 ? currentPos - 1 : maxPos;
      setActiveIndex(navigableIndices[prevPos]);
    }

    if (e.key === "Enter" && activeIndex !== null) {
      e.preventDefault();
      const opt = options[activeIndex];
      if (!opt.disabled) {
        onSelect(opt.value.toString());
        setOpen(false);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setActiveIndex(enabledOptions.findIndex((o) => o.value === selected));
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          selectBaseStyles,
          selectVariantStyles[variant],
          selectSizeStyles[selectSize],
          "flex w-full items-center justify-between"
        )}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <span className={cn(open && "text-primary-main")}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <ul ref={listRef} className={selectMenuStyles}>
          {options.map((opt, idx) => {
            const isSelected = selected === opt.value;
            const isActive = idx === activeIndex;
            return (
              <li
                key={opt.value}
                className={cn(
                  "px-4 py-2 flex items-center gap-2 hover:bg-gray-100",
                  isSelected && "bg-primary/10 text-primary font-medium",
                  isActive && !isSelected && "bg-gray-100",
                  opt.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => {
                  if (!opt.disabled) {
                    onSelect(opt.value.toString());
                    setOpen(false);
                  }
                }}
              >
                {opt.icon && <span>{opt.icon}</span>}
                <div>
                  <div>{opt.label}</div>
                  {opt.description && (
                    <div className="text-xs text-muted">{opt.description}</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
