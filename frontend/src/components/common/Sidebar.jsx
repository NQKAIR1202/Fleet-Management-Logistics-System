import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
} from "@mui/material";

import {
  MdDashboard,
  MdDirectionsCar,
  MdEngineering,
  MdBuild,
  MdWarning,
  MdAssessment,
} from "react-icons/md";

import { NavLink, useLocation } from "react-router-dom";

import Logo from "./Logo";

const drawerWidth = 260;

const menus = [
  {
    text: "Dashboard",
    icon: <MdDashboard size={22} />,
    path: "/",
  },
  {
    text: "Vehicles",
    icon: <MdDirectionsCar size={22} />,
    path: "/vehicles",
  },
  {
    text: "Drivers",
    icon: <MdEngineering size={22} />,
    path: "/drivers",
  },
  {
    text: "Maintenance",
    icon: <MdBuild size={22} />,
    path: "/maintenance",
  },
  {
    text: "Safety",
    icon: <MdWarning size={22} />,
    path: "/safety",
  },
  {
    text: "Reports",
    icon: <MdAssessment size={22} />,
    path: "/reports",
  },
];

function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Toolbar />

      <Logo />

      <Divider sx={{ mx: 2, mb: 2 }} />

      <Typography
        variant="caption"
        sx={{
          px: 3,
          pb: 1,
          color: "text.secondary",
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        MAIN MENU
      </Typography>

      <List sx={{ px: 2 }}>
        {menus.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              selected={isActive}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.2,

                transition: "all .25s",

                "&:hover": {
                  backgroundColor: "#E3F2FD",
                  transform: "translateX(4px)",
                },

                "&.Mui-selected": {
                  backgroundColor: "#1565C0",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },

                  "&:hover": {
                    backgroundColor: "#1976D2",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: isActive ? "#fff" : "#616161",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ mx: 2 }} />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Fleet Management
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Version 1.0
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;