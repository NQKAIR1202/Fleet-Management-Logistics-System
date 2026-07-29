import { useEffect, useState } from "react";

import {
    Typography,
    Box,
    CircularProgress,
    Stack,
} from "@mui/material";

import SummaryCards from "../../components/dashboard/SummaryCards";
import VehicleChart from "../../components/charts/VehicleChart";
import RecentAlerts from "../../components/dashboard/RecentAlerts";
import ChartCard from "../../components/dashboard/ChartCard";

import {
    getDashboardSummary,
    getDashboardCharts,
} from "../../services/dashboardService";

export default function Dashboard() {

    const [summary, setSummary] = useState(null);
    const [charts, setCharts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const [summaryData, chartData] = await Promise.all([
                getDashboardSummary(),
                getDashboardCharts(),
            ]);

            setSummary(summaryData);
            setCharts(chartData);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    }

    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (

        <Stack spacing={5}>

            {/* Header */}

            <Box>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{
                        mb: 1,
                    }}
                >
                    Fleet Dashboard
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Good Morning, Administrator 👋
                </Typography>

            </Box>

            {/* Summary */}

            <SummaryCards summary={summary} />

            {/* Vehicle Status */}

            {charts && (

                <ChartCard title="Vehicle Status">

                    <VehicleChart
                        data={charts.vehicleStatus ?? []}
                    />

                </ChartCard>

            )}

            {/* Alerts */}

            <RecentAlerts />

        </Stack>

    );
}