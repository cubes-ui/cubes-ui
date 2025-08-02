import { useState } from "react";
import { cn } from "../../utils";
import { tabButtonStyles, tabListStyles, tabPanelStyles } from "./tabs.style";
import { TabsProps } from "./tabs.type";

export const Tabs = ({
  tabs,
  defaultIndex = 0,
  className,
  variant = "pill",
  classNames = {},
}: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={cn("w-full", className, classNames.root)}>
      <div
        role="tablist"
        className={tabListStyles(variant, classNames.list)}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.label}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className={tabButtonStyles(variant, isActive, classNames.tab)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className={tabPanelStyles(classNames.panel)}>
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};
