import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils";
import { Input } from "../input";
import { InputOTPProps } from "./input-otp.type";

export const InputOTP = ({
  length,
  type = "number",
  onComplete,
  inputClassName = "",
  className = "",
  inputsProps,
}: InputOTPProps) => {
  const [otp, setOtp] = useState<string[]>(() => Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const isFilled = otp.every((char) => char !== "");
    const isValid = otp.every((char) =>
      type === "number" ? /^\d$/.test(char) : true
    );
    if (isFilled && isValid) onComplete(otp.join(""));
  }, [otp, type, onComplete]);

  const handleChange = (value: string, index: number) => {
    if (type === "number" && !/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.currentTarget;
    const caretAtStart = input.selectionStart === 0;

    if (e.key === "Backspace") {
      if (otp[index] && caretAtStart) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
        inputsRef.current[index - 1]?.setSelectionRange?.(0, 1);
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className={cn("w-8 h-8 p-0 text-center", inputClassName)}
          {...inputsProps}
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};
