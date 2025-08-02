import { PlusIcon } from "lucide-react";
import { cn } from "../../utils";
import { fabBaseStyles, fabPlacementMap } from "./fab.style";
import { FABProps } from "./fab.type";

export const FAB = ({
  icon,
  onClick,
  className,
  placement = "bottom-right",
}: FABProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(fabBaseStyles, fabPlacementMap[placement], className)}
      aria-label="Floating Action Button"
    >
      {icon ?? <PlusIcon className="w-5 h-5" />}
    </button>
  );
};
