import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: JSX.Element;
  text: string;
  link: string;
  index: number;
}

const NavItem = ({ index, icon, text, link }: NavItemProps) => (
  <NavLink to={link} style={{ textDecoration: "none", color: "inherit" }}>
    <ListItem
      disablePadding
      style={{
        backgroundColor:
          selectedIndex === index ? theme.palette.action.selected : undefined,
      }}
      component="div"
    >
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  </NavLink>
);
