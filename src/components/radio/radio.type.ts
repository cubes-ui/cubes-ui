export type RadioSize = "sm" | "md" | "lg";
export type RadioVariant = "default" | "outline" | "ghost";

export interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  size?: RadioSize;
  variant?: RadioVariant;
  className?: string;
}
