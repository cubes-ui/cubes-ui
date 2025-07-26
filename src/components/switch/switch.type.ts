export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  label?: string;
  className?: string;
}

