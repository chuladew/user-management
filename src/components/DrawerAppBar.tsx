import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ColorThemeSelector from "./ColorThemeSelector";
import { useState } from "react";
import { Link, useTheme } from "@mui/material";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "Users", "Analytics"];

const DrawerAppBar = (props: Props) => {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onClickNavItem = (navItem: string) => {
    switch (navItem) {
      case "Users":
        navigate("/users");
        setSelectedIndex(1);
        break;
      case "Analytics":
        navigate("/analytics");
        setSelectedIndex(2);
        break;
      default:
        navigate("/");
        setSelectedIndex(3);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={(_) => onClickNavItem(item)}
              style={{
                backgroundColor:
                  selectedIndex === index
                    ? theme.palette.action.selected
                    : undefined,
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            User Management
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                component={Link}
                href="#"
                key={item}
                sx={{ color: "#fff" }}
                style={{
                  backgroundColor:
                    selectedIndex === index
                      ? theme.palette.action.selected
                      : undefined,
                }}
                onClick={(_) => onClickNavItem(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
          <ColorThemeSelector />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default DrawerAppBar;
