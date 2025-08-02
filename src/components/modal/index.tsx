import { X } from "lucide-react";
import { RefObject, useRef } from "react";
import { useClickOutside } from "../../hooks";
import { cn } from "../../utils";
import { ModalProps } from "./modal.type";
import { modalStyles } from "./modal.style";
export const Modal = ({
  open,
  children,
  closeModal,
  closeWithClickOutside,
  className,
  title,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  if (closeWithClickOutside) {
    useClickOutside(ref as RefObject<HTMLElement>, () => {
      closeModal();
    });
  }
  return (
    <dialog className={modalStyles.modalParent} open={open}>
      <div className="w-full h-full flex justify-center items-center">
        <div ref={ref} className={cn(modalStyles.modal, className)}>
          <div className={modalStyles.closerElementParent}>
            <p className={modalStyles.title}>{title}</p>
            <X
              className="hover:text-red-500 duration-200 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          {children}
        </div>
      </div>
    </dialog>
  );
};
