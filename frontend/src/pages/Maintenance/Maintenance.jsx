import { Typography } from "@mui/material";

function Maintenance() {
  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Maintenance
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Manage maintenance schedules.
      </Typography>
    </>
  );
}

export default Maintenance;