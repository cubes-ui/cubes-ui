import { InputProps } from "../input/input.type";

export type InputOTPProps = {
  length: number;
  type: "string" | "number";
  onComplete: (otp: string) => void;
  inputClassName?: string;
  className?: string;
  inputsProps?:Omit<InputProps,"value"|"onChange">;
};
