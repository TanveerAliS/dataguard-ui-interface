import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomizedSwitch from "../../components/switch";
import { CurrentContent } from "../../interface";

interface TabContentProps {
  tabContent: CurrentContent;
  handleStatusChange: (isChecked: boolean, title: string) => void;
}

export const TabContent = (props: TabContentProps) => {
  const { tabContent, handleStatusChange } = props;

  return (
    <Box
      sx={{
        p: 3,
      }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography sx={{ ml: 2, p: 1, fontSize: 16 }} variant="caption">
        {`${tabContent?.title} Plugins`}
      </Typography>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {tabContent.plugins.map((item, id) => (
          <Box
            key={`${item.title}_${id}`}
            sx={{
              m: 1.5,
              p: 3,
              width: 400,
              border: "2.5px solid #dcdcdc",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              opacity: item.isDisabled ? 0.6 : 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
              }}
            >
              <Typography>{item?.title}</Typography>
              <CustomizedSwitch
                isDisabled={item.isDisabled}
                isActive={item.isActive}
                title={item.title}
                handleStatusChange={handleStatusChange}
                label={item.isActive ? "Allowed" : "Blocked"}
              />
            </Box>
            <Typography sx={{ width: "75%", textAlign: "justify" }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
