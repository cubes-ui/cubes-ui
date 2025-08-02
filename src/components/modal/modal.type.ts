import { ReactNode } from "react";
type ModalTitle = { title: string; icon?: ReactNode };
export type ModalState = {
  content: ReactNode;
  config?: {
    title?: ModalTitle;
    className?: string;
    closeWithClickOutside?: boolean;
  };
};
export type ModalProps = {
  open: boolean;
  closeWithClickOutside: boolean;
  children: ReactNode;
  className?: string;
  title?: ModalTitle;
  closeModal: () => void;
};
export type ModalHookProps = {
  title?: ModalTitle;
  closeWithClickOutside?: boolean;
  className?: string;
};
