import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { TabsLink } from "@atoms/index";

export interface Tab {
  to: string;
  content: React.ReactNode;
  text: string;
}

interface ITabsProps {
  subTab: Array<Tab>;
}

export const Tabs: React.FC<ITabsProps> = observer(({ subTab }) => {
  const [activeTab, setActiveTab] = useState(subTab[0]);
  const onChangeTab = (tab: Tab) => {
    setActiveTab(tab);
    navigator.vibrate(30);
  };

  return (
    <>
      <div className="flex  items-end overflow-x-auto">
        {subTab.map((tab) => (
          <div onClick={() => onChangeTab(tab)} key={tab.to}>
            <TabsLink key={tab.to} isActive={tab.to == activeTab.to}>
              {tab.text}
            </TabsLink>
          </div>
        ))}
        <div className="border-b-2 border-fg w-full"></div>
      </div>
      <div className="mt-5">{activeTab.content}</div>
    </>
  );
});
