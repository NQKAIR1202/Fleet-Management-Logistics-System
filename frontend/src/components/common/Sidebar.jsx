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

import { useAuth } from "../../context/AuthContext";

import { isAdmin } from "../../utils/permissions";

const drawerWidth = 280;

const menuItems = [

    {
        title: "Dashboard",
        path: "/",
        icon: <MdDashboard size={22} />,
    },

    {
        title: "Vehicles",
        path: "/vehicles",
        icon: <MdDirectionsCar size={22} />,
    },

    {
        title: "Drivers",
        path: "/drivers",
        icon: <MdEngineering size={22} />,

    },

    {
        title: "Maintenance",
        path: "/maintenance",
        icon: <MdBuild size={22} />,

    },

    {
        title: "Safety",
        path: "/safety",
        icon: <MdWarning size={22} />,

    },

    {
        title: "Reports",
        path: "/reports",
        icon: <MdAssessment size={22} />,

    },

];

function Sidebar() {

    const location = useLocation();

    const { user } = useAuth();

    const visibleMenus = menuItems;

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    bgcolor: "background.paper",
                    borderRight: 1,
                    borderColor: "divider",
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
                    fontWeight: 700,
                    letterSpacing: 1,
                }}
            >

                MAIN MENU

            </Typography>

            <List sx={{ px: 2 }}>

                {visibleMenus.map((item) => {

                    const isActive =
                        item.path === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(item.path);

                    return (
                                              <ListItemButton
                            key={item.title}
                            component={NavLink}
                            to={item.path}
                            selected={isActive}
                            sx={{
                                borderRadius: 3,
                                mb: 1,
                                py: 1.5,

                                transition: "all .25s ease",

                                "&:hover": {
                                    bgcolor: "action.hover",
                                    transform: "translateX(4px)",
                                },

                                "&.Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",

                                    "& .MuiListItemIcon-root": {
                                        color: "primary.contrastText",
                                    },

                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                },
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    minWidth: 42,
                                    color: isActive
                                        ? "primary.contrastText"
                                        : "text.secondary",
                                }}
                            >

                                {item.icon}

                            </ListItemIcon>

                            <ListItemText
                                primary={item.title}
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
                    fontWeight={600}
                >

                    {user?.FullName || "Guest"}

                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    {user?.Role || "Not Logged In"}

                </Typography>

            </Box>

        </Drawer>

    );

}

export default Sidebar;