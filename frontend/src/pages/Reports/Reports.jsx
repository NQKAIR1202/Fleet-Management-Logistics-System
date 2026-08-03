import { useEffect, useState } from "react";

import {
    Stack,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AssignmentLateRoundedIcon from "@mui/icons-material/AssignmentLateRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";

import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import {
    getDashboardSummary,
    getMonthlyTrend,
    getJobStatus,
    getTopVehicles,
    getCostByModel,
} from "../../services/reportService";

import DashboardCards from "../../components/reports/DashboardCards";
import ReportFilters from "../../components/reports/ReportFilters";

import MonthlyTrendChart from "../../components/reports/MonthlyTrendChart";
import StatusPieChart from "../../components/reports/StatusPieChart";
import TopVehiclesTable from "../../components/reports/TopVehiclesTable";
import WorkshopCostChart from "../../components/reports/WorkshopCostChart";

import ReportCategory from "../../components/reports/ReportCategory";
import ReportItem from "../../components/reports/ReportItem";

function Reports() {

    const [summary, setSummary] = useState(null);
    const [monthlyTrend, setMonthlyTrend] = useState([]);
    const [jobStatus, setJobStatus] = useState([]);
    const [topVehicles, setTopVehicles] = useState([]);
    const [costByModel, setCostByModel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

    try {

        const [
            summaryData,
            monthlyData,
            statusData,
            vehicleData,
            costData,
        ] = await Promise.all([

            getDashboardSummary(),

            getMonthlyTrend(),

            getJobStatus(),

            getTopVehicles(),

            getCostByModel(),

        ]);

        setSummary(summaryData);

        setMonthlyTrend(monthlyData);

        setJobStatus(statusData);

        setTopVehicles(vehicleData);

        setCostByModel(costData);

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
                alignItems="center"
                minHeight="70vh"
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Stack spacing={5}>

            <Box>

                <Typography
                    variant="h3"
                    fontWeight={700}
                >

                    Fleet Reports

                </Typography>

                <Typography
                    color="text.secondary"
                >

                    Fleet safety and workshop analytics.

                </Typography>

            </Box>

            <DashboardCards summary={summary} />

            

            <MonthlyTrendChart
                data={monthlyTrend}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "2fr 1fr",
                    gap: 3,
                }}
            >

                <StatusPieChart
                    data={jobStatus}
                />

                <TopVehiclesTable
                    data={topVehicles}
                />

            </Box>

            <WorkshopCostChart
                data={costByModel}
            />

            <ReportCategory title="Safety Reports">

                <ReportItem
                    title="High Risk Drivers"
                    description="Rank drivers by incident score."
                    icon={<WarningAmberRoundedIcon />}
                    link="/reports/high-risk-drivers"
                />

                <ReportItem
                    title="Driver Incidents"
                    description="Review all incidents."
                    icon={<AssignmentLateRoundedIcon />}
                    link="/reports/driver-incidents"
                />

                <ReportItem
                    title="Licence Expiry"
                    description="Upcoming licence expiry."
                    icon={<BadgeRoundedIcon />}
                    link="/reports/licence-expiry"
                />

                <ReportItem
                    title="Retraining Required"
                    description="Drivers requiring coaching."
                    icon={<SchoolRoundedIcon />}
                    link="/reports/retraining-required"
                />

                <ReportItem
                    title="Depot Safety Trends"
                    description="Compare depot performance."
                    icon={<TimelineRoundedIcon />}
                    link="/reports/depot-safety-trends"
                />

                <ReportItem
                    title="Unresolved Incidents"
                    description="Open safety cases."
                    icon={<ReportProblemRoundedIcon />}
                    link="/reports/unresolved-incidents"
                />

            </ReportCategory>

            <ReportCategory title="Workshop Reports">

                <ReportItem
                    title="Predictive Alerts"
                    description="Vehicles needing inspection."
                    icon={<BuildRoundedIcon />}
                    link="/reports/predictive-alerts"
                />

                <ReportItem
                    title="Workshop Workload"
                    description="Jobs allocated per mechanic."
                    icon={<EngineeringRoundedIcon />}
                    link="/reports/workshop-workload"
                />

                <ReportItem
                    title="Vehicle Downtime"
                    description="Time vehicles stay off-road."
                    icon={<PrecisionManufacturingRoundedIcon />}
                    link="/reports/vehicle-downtime"
                />

                <ReportItem
                    title="Parts Threshold"
                    description="Low stock spare parts."
                    icon={<Inventory2RoundedIcon />}
                    link="/reports/parts-threshold"
                />

                <ReportItem
                    title="Supplier Performance"
                    description="Lead time and quality."
                    icon={<LocalShippingRoundedIcon />}
                    link="/reports/supplier-performance"
                />

                <ReportItem
                    title="Cost by Model"
                    description="Maintenance cost comparison."
                    icon={<PaidRoundedIcon />}
                    link="/reports/cost-by-model"
                />

            </ReportCategory>

        </Stack>

    );

}

export default Reports;