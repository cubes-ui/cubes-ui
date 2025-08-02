export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  gap?: number;
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "between" | "around";
}
