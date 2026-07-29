import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

function getColor(level) {
  switch (level) {
    case "High":
      return "error";

    case "Medium":
      return "warning";

    default:
      return "success";
  }
}

function RecentAlerts({ alerts = [] }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 2,
        transition: (theme) =>
          theme.transitions.create(
            ["transform", "box-shadow"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 2,
            color: "text.primary",
          }}
        >
          Recent Alerts
        </Typography>

        {alerts.length === 0 ? (
          <Typography color="text.secondary">
            No recent alerts.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Alert</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {alerts.map((item) => (
                <TableRow
                  key={item.vehicle}
                  hover
                >
                  <TableCell>{item.vehicle}</TableCell>

                  <TableCell>{item.type}</TableCell>

                  <TableCell>
                    <Chip
                      label={item.severity}
                      color={getColor(item.severity)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentAlerts;