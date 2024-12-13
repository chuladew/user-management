import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Drawer, { drawerClasses } from "@mui/material/Drawer";

interface NavItemProps {
  icon: JSX.Element;
  text: string;
  link: string;
  index: number;
}

function SideBar() {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  useEffect(() => {
    switch (pathname) {
      case "/users":
        setSelectedIndex(1);
        break;
      case "/analytics":
        setSelectedIndex(2);
        break;
      default:
        setSelectedIndex(0);
    }
  }, [pathname]);

  return (
    <Drawer
      variant="permanent"
      className="side-bar-drawer"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box className="side-bar-menu-wrapper">
        <List>
          <NavItem index={1} icon={<PeopleIcon />} text="Users" link="/users" />
          <NavItem
            index={2}
            icon={<AnalyticsIcon />}
            text="Analytics"
            link="/analytics"
          />
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}

export default SideBar;
