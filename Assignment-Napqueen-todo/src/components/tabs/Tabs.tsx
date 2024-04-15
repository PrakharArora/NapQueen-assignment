import React, { FC, ChangeEvent } from "react";
import "./tabs.scss";

interface TabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ selectedTab, setSelectedTab }) => {
  const tabs: string[] = ["All", "Active", "Completed"];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value);
  };

  return (
    <div className="tabs_container">
      <select
        className="tabs_dropdown"
        value={selectedTab}
        onChange={handleChange}
      >
        {tabs.map((tab) => (
          <option key={tab} value={tab}>
            {tab}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Tabs;
