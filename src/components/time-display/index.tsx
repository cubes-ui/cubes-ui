import React, { useEffect, useState } from "react";
import { cn } from "../../utils";
import {
  timeDisplayBaseStyle,
  timeDisplayTextStyle,
} from "./time-display.style";
import { TimeDisplayProps } from "./time-display.type";
import { useInterval } from "../../hooks";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  mode = "clock",
  duration = 0,
  onFinish,
  className = "",
  haveDate = false,
  is24hour = true,
}) => {
  const [countdown, setCountdown] = useState(duration);
  const [time, setTime] = useState("");
  useInterval(
    () => {
      if (countdown > 1) {
        setCountdown((prev) => prev - 1);
      } else {
        setCountdown(0);
        if (onFinish) onFinish();
      }
    },
    mode === "countdown" && countdown > 0 ? 1000 : null
  );
  useInterval(
    () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          hour12: !is24hour,
          minute: "2-digit",
          second: "2-digit",
          ...(haveDate
            ? {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            : {}),
        })
      );
    },
    mode === "clock" ? 1000 : null
  );

  useEffect(() => {
    if (mode === "clock") {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          hour12: !is24hour,
          minute: "2-digit",
          second: "2-digit",
          ...(haveDate
            ? {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            : {}),
        })
      );
    }
  }, [mode, haveDate, is24hour]);

  return (
    <div className={cn(timeDisplayBaseStyle, className)}>
      <span className={timeDisplayTextStyle}>
        {mode === "countdown" ? formatTime(countdown) : time}
      </span>
    </div>
  );
};
