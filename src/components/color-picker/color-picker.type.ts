export interface ColorPickerProps {
  colors?: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}
