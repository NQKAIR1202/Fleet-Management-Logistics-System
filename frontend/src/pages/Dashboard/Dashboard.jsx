import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={10}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <>

            <Typography
                variant="h3"
                fontWeight="bold"
                mb={1}
            >

                Fleet Dashboard

            </Typography>

            <Typography
                variant="h6"
                color="text.secondary"
                mb={5}
            >

                Good Morning, Administrator 👋

            </Typography>

            <SummaryCards summary={summary} />

            {charts && (

                <Box mt={5}>

                    <ChartCard title="Vehicle Status">

                        <VehicleChart
                            data={charts.vehicleStatus ?? []}
                        />

                    </ChartCard>

                </Box>

            )}

            <Box mt={5}>

                <RecentAlerts />

            </Box>

        </>

    );

}