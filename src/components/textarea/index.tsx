import { forwardRef, useRef } from "react";
import { cn } from "../../utils";
import {
  textareaBaseStyles,
  textareaSizeStyles,
  textareaVariantStyles,
} from "./textarea.style";
import { TextareaProps } from "./textarea.type";
import { GripVertical } from "lucide-react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = "default", inputSize = "md", className, ...rest }, ref) => {
    const composedClassName = cn(
      textareaBaseStyles,
      textareaVariantStyles[variant] ?? textareaVariantStyles.default,
      textareaSizeStyles[inputSize] ?? textareaSizeStyles.md,
      className
    );

    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      const startY = e.clientY;
      const textarea = containerRef.current?.querySelector("textarea");
      const startHeight = textarea?.clientHeight || 0;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const dy = moveEvent.clientY - startY;
        if (textarea) {
          textarea.style.height = `${startHeight + dy}px`;
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    return (
      <div className="relative" ref={containerRef}>
        <textarea ref={ref} {...rest} className={composedClassName} />
        <div
          className="absolute bottom-1 right-2 cursor-row-resize text-muted select-none"
          onMouseDown={handleMouseDown}
        >
          <GripVertical size={16} />
        </div>
      </div>
    );
  }
);
