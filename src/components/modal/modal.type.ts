import { ReactNode } from "react";

export type ModalState = {
  content: ReactNode;
  config?: {
    title?: string;
    className?: string;
    closeWithClickOutside?: boolean;
  };
};
export type ModalProps = {
  open: boolean;
  closeWithClickOutside: boolean;
  children: ReactNode;
  className?: string;
  title?: string;
  closeModal: () => void;
};
