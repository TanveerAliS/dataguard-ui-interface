import { useEffect, useState, SyntheticEvent } from "react";
import "./App.css";
import { TabGroup } from "./container/TabList";
import { TabContent } from "./container/TabContent/index.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomizedSwitch from "./components/switch.tsx";
import { getTabs, getPlugins, updateTabData } from "./sdk";
import { TabData, Plugins, CurrentContent } from "./interface";

function App() {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [plugins, setPlugins] = useState<Plugins[]>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [allPluginsEnabled, setAllPluginsEnabled] = useState<boolean>(true);
  const [currentContent, setCurrentContent] = useState<CurrentContent>({
    title: "",
    tabId: "",
    plugins: [],
  });

  const handleTabChange = (_: SyntheticEvent, index: number) => {
    setCurrentTabIndex(index);
    prepareTabContent(tabs[index]);
  };

  const prepareTabContent = (tab: TabData) => {
    if (tab) {
      const activePlugins = tab.active.map((pluginId) => ({
        isActive: true,
        isDisabled: allPluginsEnabled ? false : true,
        ...plugins[pluginId as any],
      }));
      const inactivePlugins = tab.inactive.map((pluginId) => ({
        isInactive: true,
        isDisabled: allPluginsEnabled ? false : true,
        ...plugins[pluginId as any],
      }));
      const disabledPlugins = tab.disabled.map((pluginId) => ({
        isDisabled: true,
        ...plugins[pluginId as any],
      }));

      setCurrentContent({
        title: tab.title,
        tabId: tab.id!,
        plugins: [...disabledPlugins, ...activePlugins, ...inactivePlugins],
      });
    }
  };

  useEffect(() => {
    getTabs()
      .then((data) => setTabs(data))
      .catch((error) => console.error("Error fetching tabs:", error));
    getPlugins()
      .then((data) => setPlugins(data))
      .catch((error) => console.error("Error fetching plugins:", error));
  }, []);

  useEffect(() => {
    prepareTabContent(tabs[currentTabIndex]);
  }, [tabs, allPluginsEnabled]);

  const handleStatusChange = (isChecked: boolean, title: string) => {
    if (!title || !currentContent.tabId) {
      setAllPluginsEnabled((prevAllPluginsEnabled) => !prevAllPluginsEnabled);
      return;
    }

    const tabToUpdate = tabs.find((tab) => tab.id === currentContent.tabId);
    const titleToUpdate = title.split(" ").join("").toLowerCase();
    const status = isChecked ? "active" : "inactive";

    if (tabToUpdate) {
      const { active, inactive } = tabToUpdate;
      const activeIndex = active.indexOf(titleToUpdate);
      const inactiveIndex = inactive.indexOf(titleToUpdate);

      switch (status) {
        case "active":
          if (activeIndex === -1) {
            active.push(titleToUpdate);
          }
          if (inactiveIndex !== -1) {
            inactive.splice(inactiveIndex, 1);
          }
          break;
        case "inactive":
          if (activeIndex !== -1) {
            active.splice(activeIndex, 1);
          }
          if (inactiveIndex === -1) {
            inactive.push(titleToUpdate);
          }
          break;
        default:
          break;
      }
    }

    updateTabData(currentContent.tabId!, tabToUpdate)
      .then((updatedTab) => {
        const updatedTabs = tabs.map((tab) =>
          tab.id === currentContent.tabId ? updatedTab : tab
        );
        setTabs(updatedTabs);
        prepareTabContent(updatedTab);
      })
      .catch((error: Error) =>
        console.error("Error updating tab data:", error)
      );
  };

  return (
    <div className="App">
      <Router>
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            minWidth: "15%",
            height: "auto",
            minHeight: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            boxShadow: `inset 0px -58px 30px -38px ${
              allPluginsEnabled ? "#65C466" : "#c63040"
            }`,
          }}
        >
          <Typography
            component="p"
            sx={{
              padding: "24px",
              textAlign: "left",
              color: "#0c344b",
              fontSize: "20px",
            }}
          >
            Data<b>Guard</b>
          </Typography>
          <TabGroup
            currentTabIndex={currentTabIndex}
            handleTabChange={handleTabChange}
            tabList={tabs}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              left: "12%",
              height: "auto",
              marginBottom: "24px",
              marginTop: "auto",
            }}
          >
            <Typography variant="body2">{`All plugins ${
              allPluginsEnabled ? "enabled" : "disabled"
            } `}</Typography>
            <CustomizedSwitch
              isDisabled={null!}
              isActive={allPluginsEnabled}
              handleStatusChange={handleStatusChange}
            />
          </Box>
        </Box>
        <TabContent
          tabContent={currentContent}
          handleStatusChange={handleStatusChange}
        />
      </Router>
    </div>
  );
}

export default App;
