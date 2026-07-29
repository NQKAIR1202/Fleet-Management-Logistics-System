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
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          p: 3.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 0.5 }}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontWeight: 600,
                color,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 4,
              bgcolor: `${color}15`,
              color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: (theme) =>
                theme.transitions.create(
                  ["transform", "background-color"],
                  {
                    duration:
                      theme.transitions.duration.shorter,
                  }
                ),
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