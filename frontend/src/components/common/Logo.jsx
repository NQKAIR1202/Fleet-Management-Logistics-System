import { Box, Typography } from "@mui/material";
import { FaTruckMoving } from "react-icons/fa";

function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 3,
        py: 2,
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          bgcolor: "primary.main",
          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <FaTruckMoving size={26} />
      </Box>

      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Fleet Management
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Logistics System
        </Typography>
      </Box>
    </Box>
  );
}

export default Logo;