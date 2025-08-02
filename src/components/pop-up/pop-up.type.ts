import { RefObject } from "react";

export interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}
