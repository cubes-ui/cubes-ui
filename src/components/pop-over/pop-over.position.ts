import { PopoverPosition } from "./pop-over.type";

const fallbackOrder: Record<PopoverPosition, PopoverPosition[]> = {
  top: ["top", "bottom", "right", "left"],
  bottom: ["bottom", "top", "right", "left"],
  left: ["left", "right", "bottom", "top"],
  right: ["right", "left", "bottom", "top"],
  "top-left": ["top-left", "bottom-left", "top-right", "bottom-right"],
  "top-right": ["top-right", "bottom-right", "top-left", "bottom-left"],
  "bottom-left": ["bottom-left", "top-left", "bottom-right", "top-right"],
  "bottom-right": ["bottom-right", "top-right", "bottom-left", "top-left"],
  "top-center": ["top-center", "bottom-center", "top", "bottom"],
  "bottom-center": ["bottom-center", "top-center", "bottom", "top"],
  center: ["center"],
};

export function getBestPopoverPosition(
  preferredPosition: PopoverPosition,
  anchorRect: DOMRect,
  popoverRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number,
  padding = 8
): PopoverPosition {
  const fits = (pos: PopoverPosition): boolean => {
    switch (pos) {
      case "top":
      case "top-left":
      case "top-right":
      case "top-center":
        return anchorRect.top >= popoverRect.height + padding;
      case "bottom":
      case "bottom-left":
      case "bottom-right":
      case "bottom-center":
        return (
          viewportHeight - anchorRect.bottom >= popoverRect.height + padding
        );
      case "left":
        return anchorRect.left >= popoverRect.width + padding;
      case "right":
        return viewportWidth - anchorRect.right >= popoverRect.width + padding;
      case "center":
        return (
          anchorRect.top + anchorRect.height / 2 >= popoverRect.height / 2 &&
          anchorRect.left + anchorRect.width / 2 >= popoverRect.width / 2
        );
      default:
        return true;
    }
  };

  const fallback = fallbackOrder[preferredPosition] || [preferredPosition];
  for (const pos of fallback) {
    if (fits(pos)) return pos;
  }

  return preferredPosition;
}
