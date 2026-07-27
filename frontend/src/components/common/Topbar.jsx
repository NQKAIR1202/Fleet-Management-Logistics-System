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
} from "react-icons/md";

const drawerWidth = 260;

function Topbar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#1565C0",
            mr: 4,
          }}
        >
          Fleet Management System
        </Typography>

        <TextField
          size="small"
          placeholder="Search vehicles, drivers..."
          sx={{
            width: 320,
            bgcolor: "#F5F7FA",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <MdDarkMode size={22} />
        </IconButton>

        <IconButton>
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
              bgcolor: "#1565C0",
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