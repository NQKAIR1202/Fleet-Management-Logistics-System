import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function ChartCard({ title, children }) {
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
            mb: 3,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}

export default ChartCard;