export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
}