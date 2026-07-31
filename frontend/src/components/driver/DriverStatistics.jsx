import Grid from "@mui/material/Grid";
import {
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import BlockIcon from "@mui/icons-material/Block";
import ShieldIcon from "@mui/icons-material/Shield";

const StatCard = ({
    title,
    value,
    icon,
    color,
}) => {

    return (

        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 2,
                height: "100%",
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <Stack spacing={1}>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {value}
                    </Typography>

                </Stack>

                {icon}

            </Stack>

        </Paper>

    );

};

const DriverStatistics = ({ drivers }) => {

    const totalDrivers = drivers.length;

    const activeDrivers = drivers.filter(
        driver => driver.EmploymentStatus === "Active"
    ).length;

    const onLeaveDrivers = drivers.filter(
        driver => driver.EmploymentStatus === "On Leave"
    ).length;

    const suspendedDrivers = drivers.filter(
        driver => driver.EmploymentStatus === "Suspended"
    ).length;

    const averageSafetyScore =
        drivers.length === 0
            ? 0
            : (
                drivers.reduce(
                    (sum, driver) =>
                        sum + Number(driver.SafetyScore || 0),
                    0
                ) / drivers.length
            ).toFixed(1);

    return (

        <Grid container spacing={3}>

            <Grid item xs={12} sm={6} md={2.4}>

                <StatCard

                    title="Total Drivers"

                    value={totalDrivers}

                    icon={

                        <PeopleAltIcon
                            sx={{
                                fontSize: 42,
                                color: "primary.main",
                            }}
                        />

                    }

                />

            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>

                <StatCard

                    title="Active Drivers"

                    value={activeDrivers}

                    icon={

                        <DirectionsCarIcon
                            sx={{
                                fontSize: 42,
                                color: "success.main",
                            }}
                        />

                    }

                />

            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>

                <StatCard

                    title="Average Safety"

                    value={averageSafetyScore}

                    icon={

                        <ShieldIcon
                            sx={{
                                fontSize: 42,
                                color: "info.main",
                            }}
                        />

                    }

                />

            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>

                <StatCard

                    title="On Leave"

                    value={onLeaveDrivers}

                    icon={

                        <BeachAccessIcon
                            sx={{
                                fontSize: 42,
                                color: "warning.main",
                            }}
                        />

                    }

                />

            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>

                <StatCard

                    title="Suspended"

                    value={suspendedDrivers}

                    icon={

                        <BlockIcon
                            sx={{
                                fontSize: 42,
                                color: "error.main",
                            }}
                        />

                    }

                />

            </Grid>

        </Grid>

    );

};

export default DriverStatistics;