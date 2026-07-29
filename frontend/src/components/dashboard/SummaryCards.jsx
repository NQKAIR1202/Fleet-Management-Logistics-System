import Grid from "@mui/material/Grid";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import StatCard from "./StatCard";

export default function SummaryCards({ summary }) {

    if (!summary) return null;

    return (

        <Grid container spacing={4}>

            <Grid item xs={12} md={3}>

                <StatCard
                    title="Vehicles"
                    value={summary.totalVehicles}
                    subtitle="+12 this month"
                    icon={<DirectionsCarIcon fontSize="large" />}
                    color="#1565C0"
                />

            </Grid>

            <Grid item xs={12} md={3}>

                <StatCard
                    title="Drivers"
                    value={summary.totalDrivers}
                    subtitle="Fleet drivers"
                    icon={<PeopleIcon fontSize="large" />}
                    color="#2E7D32"
                />

            </Grid>

            <Grid item xs={12} md={3}>

                <StatCard
                    title="Open Jobs"
                    value={summary.openMaintenanceJobs}
                    subtitle="Maintenance jobs"
                    icon={<BuildIcon fontSize="large" />}
                    color="#EF6C00"
                />

            </Grid>

            <Grid item xs={12} md={3}>

                <StatCard
                    title="Alerts"
                    value={summary.openAlerts}
                    subtitle="Safety alerts"
                    icon={<WarningAmberIcon fontSize="large" />}
                    color="#D32F2F"
                />

            </Grid>

        </Grid>

    );

}