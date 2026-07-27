import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        borderRadius: 2,
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        },
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: .5 }}
            >
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: color,
                mt: 1,
                fontWeight: 600,
              }}
            >
              {subtitle}
            </Typography>

          </Box>

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "5  0%",
              bgcolor: `${color}15`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: color,
            }}
          >
            {icon}
          </Box>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default StatCard;