import { useNavigate, useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { Link, useTheme } from "@mui/material";
import { NAV_ITEMS, ROUTES } from "../constants";
import { ROUTE_OPT } from "../types";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const DrawerAppBar = (props: Props) => {
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(-1);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onClickNavItem = (navItem: ROUTE_OPT) => {
    navigate(navItem.route);
  };

  useEffect(() => {
    switch (location.pathname.toLowerCase()) {
      case ROUTES.USERS:
        setSelectedMenuId(NAV_ITEMS.users.id);
        break;
      case ROUTES.ANALYTICS:
        setSelectedMenuId(NAV_ITEMS.analytics.id);
        break;
      default:
        setSelectedMenuId(NAV_ITEMS.home.id);
    }
  }, [location.pathname]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        User Management
      </Typography>
      <Divider />
      <List>
        {Object.values(NAV_ITEMS).map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={(_) => onClickNavItem(item)}
              style={{
                backgroundColor:
                  selectedMenuId === item.id
                    ? theme.palette.action.selected
                    : undefined,
              }}
            >
              <ListItemText primary={item.label} />
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
            {Object.values(NAV_ITEMS).map((item: ROUTE_OPT) => (
              <Button
                component={Link}
                href="#"
                key={item.id}
                sx={{ color: "#fff" }}
                style={{
                  backgroundColor:
                    selectedMenuId === item.id
                      ? theme.palette.action.selected
                      : undefined,
                }}
                onClick={(_) => onClickNavItem(item)}
              >
                {item.label}
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
