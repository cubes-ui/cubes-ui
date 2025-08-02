import { ChevronRight } from "lucide-react";
import { CSSProperties } from "react";
import { cn } from "../../utils";
import { Badge } from "../badge";
import { BreadcrumbPropsType } from "./breadcrumb.type";

export const Breadcrumb = ({
  items,
  className,
  rounded = "auto",
  itemsClassName,
  separator = <ChevronRight />,
}: BreadcrumbPropsType) => (
  <div
    className={cn(
      "flex items-center gap-1 text-gray-500 dark:text-gray-400 m-2",
      className
    )}
    style={
      {
        "--breadcrumb-rounded": rounded,
      } as CSSProperties
    }
  >
    {items.map((item, index) => (
      <div key={index} className="flex items-center justify-evenly">
        <Badge
          className={cn(
            "text-base font-semibold ml-0",
            rounded != "auto" && `rounded-[var(--breadcrumb-rounded)]`,
            itemsClassName
          )}
        >
          {item}
        </Badge>
        {index < items.length - 1 && (
          <span className="mx-1 text-base font-semibold">{separator}</span>
        )}
      </div>
    ))}
  </div>
);
