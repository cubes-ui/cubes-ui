import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils";
import { FAB } from "../fab";
import {
  speedDialBasePosition,
  speedDialTranslateMap,
} from "./speed-dial.style";
import { SpeedDialProps } from "./speed-dial.type";

export const SpeedDial = ({
  actions,
  icon,
  placement = "bottom-right",
  className,
}: SpeedDialProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn("fixed z-50", speedDialBasePosition[placement], className)}
      role="region"
      aria-label="Speed Dial"
    >
      <div
        className={cn(
          "relative flex flex-col gap-2",
          placement.includes("left") ? "items-start" : "items-end",
          placement.includes("top") ? "mt-20" : "mb-20"
        )}
      >
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className={cn(
              "flex items-center gap-2 px-3 py-2 bg-white shadow rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out",
              open
                ? `opacity-100 ${speedDialTranslateMap[placement]} delay-[${
                    idx * 50
                  }ms]`
                : "opacity-0 pointer-events-none"
            )}
            aria-label={action.label}
          >
            {action.icon}
            {action.label && (
              <span className="text-sm font-medium text-gray-800">
                {action.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <FAB
        icon={icon ?? <PlusIcon className="w-5 h-5" />}
        onClick={() => setOpen((prev) => !prev)}
        placement={placement}
        className={open ? "rotate-45" : "rotate-0"}
      />
    </div>
  );
};
