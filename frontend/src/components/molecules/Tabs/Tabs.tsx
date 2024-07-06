import { TabsLink } from "@atoms/index";
import React, { useState } from "react";

export interface Tab {
  to: string;
  content: React.ReactNode;
  text: string;
}

interface ITabsProps {
  subTab: Array<Tab>;
}

export const Tabs: React.FC<ITabsProps> = ({ subTab }) => {
  const [activeTab, setActiveTab] = useState(subTab[0]);
  const onChangeTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex ">
        {subTab.map((tab) => (
          <div onClick={() => onChangeTab(tab)}>
            <TabsLink key={tab.to} isActive={tab.to == activeTab.to}>
              {tab.content}
            </TabsLink>
          </div>
        ))}
        <div className="border-b-2 border-fg w-full"></div>
      </div>
      {activeTab.content}
    </>
  );
};
