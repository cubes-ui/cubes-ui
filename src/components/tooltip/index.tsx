import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils";
import { getBestTooltipPosition } from "./tooltip.position";
import { arrowStyles, tooltipPositionClasses } from "./tooltip.style";
import { Position, TooltipProps } from "./tooltip.type";

export const Tooltip = ({
  children,
  content,
  position = "top",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [finalPosition, setFinalPosition] = useState<Position>(position);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!visible) return;

    const targetEl = targetRef.current;
    const tooltipEl = tooltipRef.current;
    if (!targetEl || !tooltipEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const bestPosition = getBestTooltipPosition(
      position,
      targetRect,
      tooltipRect,
      viewportWidth,
      viewportHeight
    );

    setFinalPosition(bestPosition);
  }, [visible, position]);

  return (
    <div
      className="relative inline-flex items-center space-x-1 cursor-pointer"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={targetRef}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={cn(
            `absolute z-50 px-2 py-1 text-sm text-white bg-black rounded shadow`,
            tooltipPositionClasses[finalPosition]
          )}
        >
          {content}
          <span style={arrowStyles[finalPosition]} className="bg-black" />
        </div>
      )}
    </div>
  );
};
