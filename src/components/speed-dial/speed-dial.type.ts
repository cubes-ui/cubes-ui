
export interface SpeedDialAction {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

export interface SpeedDialProps {
  actions: SpeedDialAction[];
  icon?: React.ReactNode;
  placement?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}