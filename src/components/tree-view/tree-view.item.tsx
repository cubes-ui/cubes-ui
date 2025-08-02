import { ChevronDown, ChevronRight } from "lucide-react";
import { memo } from "react";
import { TreeNode } from "./tree-view.type";

export const TreeItem = memo(
  ({
    node,
    level,
    isExpanded,
    hasChildren,
    onToggle,
    renderLabel,
    childrenRender,
  }: {
    node: TreeNode;
    level: number;
    isExpanded: boolean;
    hasChildren: boolean;
    onToggle: (id: string) => void;
    renderLabel?: (node: TreeNode) => React.ReactNode;
    childrenRender: React.ReactNode;
  }) => {
    return (
      <li role="treeitem" aria-expanded={isExpanded} className="group">
        <div
          className="flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
          style={{ paddingLeft: `${level * 16}px` }}
          onClick={() => hasChildren && onToggle(node.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )
          ) : (
            <span className="w-4" />
          )}
          <span className="truncate text-black">
            {renderLabel ? renderLabel(node) : node.label}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="transition-all duration-200 ease-in-out ml-1 border-l border-gray-200">
            {childrenRender}
          </div>
        )}
      </li>
    );
  }
);