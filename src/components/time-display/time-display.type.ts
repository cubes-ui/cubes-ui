export type TimeDisplayMode = "clock" | "countdown";

export interface TimeDisplayProps {
  mode?: TimeDisplayMode;
  duration?: number;
  haveDate?: boolean;
  is24hour?: boolean;
  onFinish?: () => void;
  className?: string;
}
