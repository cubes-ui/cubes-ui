import { cn } from "../../utils";
import { TimelineProps } from "./timeline.type";

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div
      className={cn(
        "space-y-6 relative border-l-2 border-gray-300 pl-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <div key={idx} className="relative flex items-start gap-4 flex-wrap">
          <div className="flex gap-2 items-center justify-center">
            {item.icon ?? (
              <div className="h-4 w-4 rounded-full border-2 border-primary bg-white" />
            )}
            <h4 className="text-sm font-semibold text-gray-800">
              {item.title}
            </h4>
          </div>
          <div className="flex flex-wrap w-full">
            {item.time && (
              <p className="text-xs text-gray-500 w-full">{item.time}</p>
            )}
            {item.description && (
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
