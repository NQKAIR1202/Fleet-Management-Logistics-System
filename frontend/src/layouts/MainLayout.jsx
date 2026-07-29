import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Topbar />

      <Sidebar />

      <Box
    component="main"
    sx={{
        flexGrow:1,
        bgcolor:"background.default",

        minHeight:"100vh",

        px:{
            xs:3,
            md:6,
        },

        py:5,

        maxWidth:"1800px",

        mx:"auto",
    }}
>
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;