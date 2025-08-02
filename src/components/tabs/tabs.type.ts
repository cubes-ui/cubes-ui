import { ReactNode } from "react";

type TabVariant = "pill" | "underline";

interface TabItem {
  label: string;
  content: ReactNode;
}
interface TabsClassNames {
  root?: string;
  list?: string;
  tab?: string;
  panel?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
  className?: string;
  variant?: TabVariant;
  classNames?: TabsClassNames;
}