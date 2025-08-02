import { fallbackOrder } from "./tooltip.style";
import { Position } from "./tooltip.type";

export function getBestTooltipPosition(
  preferredPosition: Position,
  targetRect: DOMRect,
  tooltipRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number,
  padding = 8
): Position {
  const positions: Position[] = ["top", "bottom", "left", "right"];

  const canShowArr = positions.map((pos) => {
    let fits: boolean;
    switch (pos) {
      case "top":
        fits = targetRect.top >= tooltipRect.height + padding;
        break;
      case "bottom":
        fits =
          viewportHeight - targetRect.bottom >= tooltipRect.height + padding;
        break;
      case "left":
        fits = targetRect.left >= tooltipRect.width + padding;
        break;
      case "right":
        fits = viewportWidth - targetRect.right >= tooltipRect.width + padding;
        break;
    }
    return { pos, fits };
  });

  const bestPosition = fallbackOrder[preferredPosition].find((pos) => {
    return canShowArr.find((item) => item.pos === pos)?.fits;
  });

  return bestPosition ?? preferredPosition;
}
