import { Typography } from "@mui/material";

function Drivers() {
  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Drivers
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Manage all company drivers.
      </Typography>
    </>
  );
}

export default Drivers;