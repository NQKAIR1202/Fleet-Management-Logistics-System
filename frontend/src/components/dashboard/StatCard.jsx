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
          boxShadow:"0 6px 16px rgba(0,0,0,.08)",
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
              sx={{ mb: .5 }}
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
              width: 72,
              height: 72,
              borderRadius: 4,
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