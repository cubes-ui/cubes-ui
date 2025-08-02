import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToggle } from "../../hooks";
import { cn } from "../../utils";
import { CollapsibleProps } from "./collapsible.type";

export const Collapsible = ({
  title,
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const [isOpen, toggle] = useToggle(defaultOpen);

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      requestAnimationFrame(() => {
        setHeight(isOpen ? `${el.scrollHeight}px` : "0px");
      });
    }
  }, [isOpen, children]);

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow transition-all",
        className
      )}
    >
      <button
        onClick={toggle}
        className={cn(
          "flex w-full items-center justify-between gap-2 px-5 py-4 text-left text-base font-semibold text-gray-900 transition rounded-lg hover:bg-gray-50",
          isOpen && "text-primary-600  rounded-b-none"
        )}
        aria-expanded={isOpen}
        aria-controls="collapsible-content"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "text-gray-500 transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180"
          )}
          size={20}
        />
      </button>

      <div
        id="collapsible-content"
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div className="px-5 py-4 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
};
