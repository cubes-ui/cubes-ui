import { ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
  defaultExpanded?: string[];
  onToggle?: (id: string, expanded: boolean) => void;
  renderLabel?: (node: TreeNode) => ReactNode;
}
