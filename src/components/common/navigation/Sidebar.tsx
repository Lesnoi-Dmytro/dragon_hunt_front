import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
};

type NavItem = {
  path: string;
  text: string;
  icon: string;
};

export default function Sidebar({ open, onClose }: Props) {
  const router = useRouter();

  const navItems: NavItem[] = [
    {
      path: "/hub/battles/resources",
      text: "Battles",
      icon: "/images/swords.svg",
    },
    {
      path: "/hub/inventory",
      text: "Inventory",
      icon: "/images/bag.svg",
    },
    {
      path: "/hub/smith",
      text: "Smith",
      icon: "/images/anvil.svg",
    },
    {
      path: "/hub/shop",
      text: "Shop",
      icon: "/images/coins.svg",
    },
    {
      path: "/hub/guild",
      text: "Guild",
      icon: "/images/guild.svg",
    },
  ];

  return (
    <Drawer open={open} onClose={onClose}>
      <Box className="flex flex-col h-full justify-between items-center py-2">
        <List className="w-full">
          {navItems.map((item) => (
            <ListItem key={item.path}>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemIcon
                  sx={{
                    minWidth: "48px",
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.text}
                    height={36}
                    width={36}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "1.5rem",
                      fontWeight: 500,
                    },
                  }}
                >
                  {item.text}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box className="w-full p-2 pb-0">
          <ThemeSwitch />
        </Box>
      </Box>
    </Drawer>
  );
}
