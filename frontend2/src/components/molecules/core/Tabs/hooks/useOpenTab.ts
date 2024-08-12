import { useState } from "react";
import { Tab } from "../Tabs";

export const useOpenTab = (
  subTab: Array<Tab>
): [activeTab: Tab, onChange: (tab: Tab) => void] => {
  const [activeTab, setActiveTab] = useState(subTab[0]);
  const onChangeTab = (tab: Tab) => {
    setActiveTab(tab);
    navigator.vibrate(30);
  };
  return [activeTab, onChangeTab];
};
