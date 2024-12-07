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
      path: "/combat",
      text: "Combat",
      icon: "/images/swords.svg",
    },
    {
      path: "/inventory",
      text: "Inventory",
      icon: "/images/bag.svg",
    },
    {
      path: "/smith",
      text: "Smith",
      icon: "/images/armor.svg",
    },
    {
      path: "/shop",
      text: "Shop",
      icon: "/images/coins.svg",
    },
  ];

  return (
    <Drawer open={open} onClose={onClose}>
      <Box className="flex flex-col h-full justify-between items-center py-2">
        <List className="w-full">
          {navItems.map((item) => (
            <ListItem key={item.path}>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemIcon>
                  <Image
                    src={item.icon}
                    alt={item.text}
                    height={24}
                    width={24}
                    className="dark-invert"
                  />
                </ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
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
