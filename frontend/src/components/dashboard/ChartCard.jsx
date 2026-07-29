import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function ChartCard({ title, children }) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
        height: "100%",
      }}
    >
      <CardContent
sx={{
p:4
}}
>

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          {title}
        </Typography>

        {children}

      </CardContent>
    </Card>
  );
}

export default ChartCard;