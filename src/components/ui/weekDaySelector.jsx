import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function weekDaySelector({ names, setPersonName, personName }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        sx={{
          marginLeft: 1,
          marginRight: 1,
          width: { xs: "100%", md: 300 },
          [theme.breakpoints.down("md")]: { width: "100%" },
        }}
      >
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{
            height: 45,
            borderRadius: 2,
            borderWidth: 1.5,
            outline: "none",
            borderStyle: "solid",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
