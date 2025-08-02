import { RefObject, useEffect, useRef } from "react";
import { useClickOutside } from "../../hooks";
import { cn } from "../../utils";
import { PopUpProps } from "./pop-up.type";

export function PopUp({ isOpen, onClose, children, className }: PopUpProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useClickOutside(dialogRef as RefObject<HTMLElement>, () => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
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

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "absolute z-50 rounded-md bg-white shadow-lg p-4 text-gray-800 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] border-none",
        className
      )}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </dialog>
  );
}
