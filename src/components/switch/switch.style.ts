import { SwitchSize } from "./switch.type";

export const switchSizeStyles: Record<
  SwitchSize,
  {
    trackWidth: string;
    trackHeight: string;
    thumbSize: string;
    translateX: string;
  }
> = {
  sm: {
    trackWidth: "w-10",
    trackHeight: "h-5",
    thumbSize: "w-4 h-4",
    translateX: "translate-x-4",
  },
  md: {
    trackWidth: "w-12",
    trackHeight: "h-6",
    thumbSize: "w-5 h-5",
    translateX: "translate-x-5",
  },
  lg: {
    trackWidth: "w-16",
    trackHeight: "h-8",
    thumbSize: "w-7 h-7",
    translateX: "translate-x-7",
  },
};
