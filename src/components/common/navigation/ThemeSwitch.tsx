import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  SvgIconTypeMap,
  useColorScheme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type ModeItem = {
  name: string;
  value: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export default function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as "light" | "dark" | "system");
  };

  const modes: ModeItem[] = [
    {
      name: "Light",
      value: "light",
      icon: WbSunnyIcon,
    },
    {
      name: "Dark",
      value: "dark",
      icon: NightlightIcon,
    },
    {
      name: "System",
      value: "system",
      icon: Brightness4Icon,
    },
  ];

  return mode ? (
    <Select
      value={mode}
      onChange={handleChange}
      fullWidth
      className="iconed-text"
    >
      {modes.map((mode) => (
        <MenuItem value={mode.value} key={mode.value}>
          <Box className="iconed-text">
            <mode.icon />
            {mode.name}
          </Box>
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Skeleton width="100%" height={57} variant="rounded" />
  );
}
