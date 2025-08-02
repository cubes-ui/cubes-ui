
import { RefObject, useEffect, useRef, useState } from "react";
import { PopoverProps } from "./pop-over.type";
import { useClickOutside } from "../../hooks";
import { getBestPopoverPosition } from "./pop-over.position";
import { cn } from "../../utils";

export function Popover({
  isOpen,
  onClose,
  anchorRef,
  position = "bottom",
  children,
  className,
}: PopoverProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useClickOutside(dialogRef as RefObject<HTMLElement>, () => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.style.visibility = "hidden";
      dialog.showModal();
      setTimeout(() => {
        dialog.style.visibility = "visible";
      }, 0);
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const anchor = anchorRef.current;
    if (!dialog || !anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const offset = 8;

    const bestPosition = getBestPopoverPosition(
      position,
      anchorRect,
      dialogRect,
      viewportWidth,
      viewportHeight,
      offset
    );

    let top = 0,
      left = 0;

    switch (bestPosition) {
      case "top":
        top = anchorRect.top - dialogRect.height - offset;
        left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
        break;
      case "bottom":
        top = anchorRect.bottom + offset;
        left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
        break;
      case "left":
        top = anchorRect.top + anchorRect.height / 2 - dialogRect.height / 2;
        left = anchorRect.left - dialogRect.width - offset;
        break;
      case "right":
        top = anchorRect.top + anchorRect.height / 2 - dialogRect.height / 2;
        left = anchorRect.right + offset;
        break;
      case "top-left":
        top = anchorRect.top - dialogRect.height - offset;
        left = anchorRect.left;
        break;
      case "top-right":
        top = anchorRect.top - dialogRect.height - offset;
        left = anchorRect.right - dialogRect.width;
        break;
      case "bottom-left":
        top = anchorRect.bottom + offset;
        left = anchorRect.left;
        break;
      case "bottom-right":
        top = anchorRect.bottom + offset;
        left = anchorRect.right - dialogRect.width;
        break;
      case "top-center":
        top = anchorRect.top - dialogRect.height - offset;
        left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
        break;
      case "bottom-center":
        top = anchorRect.bottom + offset;
        left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
        break;
      case "center":
        top = anchorRect.top + anchorRect.height / 2 - dialogRect.height / 2;
        left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
        break;
    }

    left = Math.min(Math.max(8, left), viewportWidth - dialogRect.width - 8);
    top = Math.min(Math.max(8, top), viewportHeight - dialogRect.height - 8);

    setStyle({ top, left, position: "fixed" });
  }, [isOpen, position, anchorRef]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "z-50 rounded-md bg-white shadow-lg p-4 max-w-xs text-gray-900",
        className
      )}
      style={{ border: "none", padding: 0, ...style }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </dialog>
  );
}
