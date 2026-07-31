import { useContext } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  TextField,
  InputAdornment,
  Badge,
} from "@mui/material";

import {
  MdNotifications,
  MdSearch,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";

import ColorModeContext from "../../context/ColorModeContext";

const drawerWidth = 280;

function Topbar() {

  const {

    mode,

    toggleColorMode,

  } = useContext(ColorModeContext);

  return (

    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >

      <Toolbar>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "primary.main",
            mr: 4,
          }}
        >
          Fleet Management System
        </Typography>

        

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          onClick={toggleColorMode}
          sx={{
            color: "text.secondary",

            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >

          {

            mode === "light"

              ?

              <MdDarkMode size={22} />

              :

              <MdLightMode size={22} />

          }

        </IconButton>

        <IconButton
          color="inherit"
          sx={{
            color: "text.secondary",

            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Badge
            badgeContent={5}
            color="error"
          >
            <MdNotifications size={22} />
          </Badge>
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 2,
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            A
          </Avatar>

          <Box>

            <Typography
              fontWeight="bold"
              fontSize={14}
            >
              Administrator
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              System Manager
            </Typography>

          </Box>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default Topbar;