export interface ToggleButtonProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  variant?: "solid" | "outline";
  disabled?: boolean;
  children?: React.ReactNode;
}
