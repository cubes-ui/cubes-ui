export type SelectVariant = "default" | "outline" | "ghost";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: SelectVariant;
  selectSize?: SelectSize;
}
