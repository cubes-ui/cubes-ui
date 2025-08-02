import { useState } from "react";
import { TreeItem } from "./tree-view.item";
import { TreeNode, TreeViewProps } from "./tree-view.type";

export const TreeView = ({
  data,
  defaultExpanded = [],
  onToggle,
  renderLabel,
}: TreeViewProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggleNode = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      const isExpanding = !next.has(id);
      isExpanding ? next.add(id) : next.delete(id);
      onToggle?.(id, isExpanding);
      return next;
    });
  };

  const renderTree = (nodes: TreeNode[], level = 0) => (
    <ul role="group" className="pl-2 space-y-1">
      {nodes.map((node) => {
        const isExpanded = expandedIds.has(node.id);
        const hasChildren = !!node.children?.length;

        return (
          <TreeItem
            key={node.id}
            node={node}
            level={level}
            isExpanded={isExpanded}
            hasChildren={hasChildren}
            onToggle={toggleNode}
            renderLabel={renderLabel}
            childrenRender={
              hasChildren && isExpanded
                ? renderTree(node.children!, level + 1)
                : null
            }
          />
        );
      })}
    </ul>
  );

  return (
    <div
      role="tree"
      className="text-sm font-medium text-gray-800 dark:text-gray-100"
    >
      {renderTree(data)}
    </div>
  );
};
