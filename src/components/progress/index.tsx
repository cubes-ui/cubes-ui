import { CheckCircle } from "lucide-react";
import { cn } from "../../utils";
import { colorClasses } from "./progress.style";
import { ProgressCardProps } from "./progress.type";

export const Progress = ({
  title,
  value,
  max = 100,
  variant = "default",
  circle = false,
  showLabel = false,
  icon,
  size = 72,
  strokeWidth = 6,
  className,
}: ProgressCardProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const Icon = icon;
  const isComplete = percentage === 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage >= 100
      ? colorClasses.high
      : percentage >= 50
      ? colorClasses.medium
      : colorClasses.low;

  return (
    <div
      className={cn(
        "border border-gray-200 rounded-md p-4 bg-white transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">{title}</span>

        <span className="text-sm font-semibold text-gray-900">
          {isComplete ? (
            <CheckCircle className="text-primary" />
          ) : (
            `${Math.round(percentage)}%`
          )}
        </span>
      </div>

      {circle ? (
        <div className="flex justify-center">
          <div
            className={cn(
              "relative inline-block bg-white rounded-full ring-3 ring-gray-100"
            )}
            style={{ width: size, height: size }}
          >
            <svg width={size} height={size} className="rotate-[-90deg]">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                strokeWidth={strokeWidth}
                stroke="var(--tw-border-color)"
                className={cn({
                  "text-gray-200": variant === "ghost",
                  "text-border": variant === "outline",
                  "text-gray-300": variant === "default",
                })}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={cn(
                  "transition-[stroke-dashoffset] duration-700 ease-out",
                  {
                    [color.text]: true,
                  }
                )}
                stroke="currentColor"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
              {Icon ? (
                <Icon className={cn("w-5 h-5", color.text)} />
              ) : showLabel ? (
                <span>{Math.round(percentage)}%</span>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-700 ease-out",
              color.bg
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};
