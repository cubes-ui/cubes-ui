import { SpacerProps } from "./spcer.type";

export const Spacer = ({ size = 4, direction = "vertical" }: SpacerProps) => {
  const classes = {
    vertical: `h-${size}`,
    horizontal: `w-${size}`,
  };

  return <div className={classes[direction]} aria-hidden="true" />;
};
