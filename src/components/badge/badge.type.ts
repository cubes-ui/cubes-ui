export type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
};
