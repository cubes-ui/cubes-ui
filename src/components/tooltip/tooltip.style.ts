import { Position } from "./tooltip.type";

export const tooltipPositionClasses: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};
export const fallbackOrder: Record<Position, Position[]> = {
  top: ["top", "bottom", "right", "left"],
  bottom: ["bottom", "top", "right", "left"],
  left: ["left", "right", "top", "bottom"],
  right: ["right", "left", "top", "bottom"],
};

export const arrowStyles: Record<Position, React.CSSProperties> = {
  top: {
    bottom: "-4px",
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
    position: "absolute",
    width: "16px",
    height: "16px",
    zIndex: -1,
  },
  bottom: {
    top: "-4px",
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
    position: "absolute",
    width: "16px",
    height: "16px",
    zIndex: -1,
  },
  left: {
    right: "-4px",
    top: "50%",
    transform: "translateY(-50%) rotate(45deg)",
    position: "absolute",
    width: "16px",
    height: "16px",
    zIndex: -1,
  },
  right: {
    left: "-4px",
    top: "50%",
    transform: "translateY(-50%) rotate(45deg)",
    position: "absolute",
    width: "16px",
    height: "16px",
    zIndex: -1,
  },
};
