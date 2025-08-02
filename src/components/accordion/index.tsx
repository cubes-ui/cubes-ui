import { cn } from "../../utils";
import { Collapsible } from "../collapsible";
import { CollapsibleProps } from "../collapsible/collapsible.type";

export const Accordion = ({
  items,
  className,
}: {
  items: CollapsibleProps[];
  className?: string;
}) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <Collapsible
          key={index}
          title={item.title}
          defaultOpen={item.defaultOpen}
          className={cn(
            "rounded-none *:hover:rounded-none shadow-none",
            item.className
          )}
        >
          {item.children}
        </Collapsible>
      ))}
    </div>
  );
};
