import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";

import Switch, { SwitchProps } from "@mui/material/Switch";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface CustomizedSwitchProps {
  isActive: boolean | undefined;
  isDisabled: boolean | undefined;
  title?: string;
  label?: string;
  handleStatusChange: (isChecked: boolean, title: string) => void;
}
const CustomizedSwitch = ({
  isActive,
  isDisabled,
  label,
  title,
  handleStatusChange,
}: CustomizedSwitchProps) => {
  const color = isActive || isDisabled ? "#65C466" : "#c63040";
  return (
    <FormControlLabel
      sx={{
        flexDirection: "column",
        color,
      }}
      control={
        <IOSSwitch
          sx={{
            m: 1,
            ".MuiSwitch-track": {
              backgroundColor: color,
            },
          }}
          checked={isActive}
          disabled={isDisabled}
          onChange={(e) => handleStatusChange(e.target.checked, title!)}
        />
      }
      label={label}
    />
  );
};

export default CustomizedSwitch;
