import { Quote } from "lucide-react";
import { cn } from "../../utils";
import { BlockquoteProps } from "./block-qoute.type";

export const Blockquote = ({
  children,
  author,
  cite,
  icon = true,
  border = true,
  className,
}: BlockquoteProps) => {
  return (
    <blockquote
      className={cn(
        "relative p-6 rounded-md bg-muted text-muted-foreground shadow",
        border && "border-l-4 border-primary pl-5",
        icon && "pt-10",
        className
      )}
    >
      {icon && (
        <Quote className="absolute top-4 left-4 w-5 h-5 text-primary opacity-50" />
      )}

      <p className="text-base leading-relaxed">{children}</p>

      {(author || cite) && (
        <footer className="mt-4 text-sm text-muted-foreground italic">
          {author && <span>&mdash; {author}</span>}
          {cite && (
            <span className="ml-2 not-italic text-xs opacity-70">{cite}</span>
          )}
        </footer>
      )}
    </blockquote>
  );
};

export default function DemoBlockquote() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <Blockquote author="Steve Jobs" cite="Apple Keynote 2005" icon border>
        "You can’t connect the dots looking forward; you can only connect them
        looking backward."
      </Blockquote>
    </div>
  );
}
