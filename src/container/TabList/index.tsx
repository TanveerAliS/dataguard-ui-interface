import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { TabData } from "../../interface";

interface TabGroupProps {
  currentTabIndex: number;
  handleTabChange: (event: React.SyntheticEvent, index: number) => void;
  tabList: TabData[];
}

export const TabGroup = ({
  currentTabIndex,
  handleTabChange,
  tabList,
}: TabGroupProps) => {
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={currentTabIndex}
      onChange={handleTabChange}
      aria-label="Vertical tabs example"
      sx={{
        backgroundColor: "#f1f1f1",
        minWidth: "12%",
        height: "auto",
        textAlign: "left",
        borderColor: "divider",
        ".MuiTab-root": {
          alignItems: "flex-start",
          paddingLeft: "24px",
          textTransform: "initial",
        },
        ".MuiTabs-indicator": {
          left: 0,
          backgroundColor: "#c63140",
          width: "4px",
        },
        ".Mui-selected": {
          color: "black !important",
          backgroundColor: "white",
        },
      }}
    >
      {tabList.map((item) => (
        <Tab
          key={item.title}
          label={item.title}
          to={`/${item.title.toLocaleLowerCase()}`}
          component={Link}
        />
      ))}
    </Tabs>
  );
};
