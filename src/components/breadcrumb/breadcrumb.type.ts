import { ReactNode } from "react";

export type BreadcrumbPropsType = {
  items: string[];
  className?: string;
  itemsClassName?: string;
  separator?: ReactNode;
  rounded?: string | "auto";
};