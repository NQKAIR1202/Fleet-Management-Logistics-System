import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    CircularProgress,
    Box,
    Chip,
    Typography,
} from "@mui/material";

import GenericReportTable from "../../components/reports/GenericReportTable";

import {
    getPredictiveAlerts,
    getWorkshopWorkload,
    getVehicleDowntime,
    getPartsThreshold,
    getSupplierPerformance,
    getHighRiskDrivers,
    getLicenceExpiry,
    getCostByModel,
    getDriverIncidents,
    getUnresolvedIncidents,
    getRetrainingRequired,
    getDepotSafetyTrends,
} from "../../services/reportService";

function getSeverityColor(severity) {

    switch (severity) {

        case "Critical":
            return "error";

        case "High":
            return "warning";

        case "Medium":
            return "info";

        default:
            return "success";

    }

}

function getStatusColor(status) {

    switch (status) {

        case "Open":
            return "error";

        case "In Progress":
            return "warning";

        case "Resolved":
            return "success";

        default:
            return "default";

    }

}

const REPORT_CONFIG = {

    "predictive-alerts": {

        title: "Predictive Alerts",

        api: getPredictiveAlerts,

        columns: [

            { key: "VIN", label: "VIN" },

            { key: "AlertType", label: "Alert Type" },

            { key: "Severity", label: "Severity" },

            { key: "AlertStatus", label: "Status" },

            { key: "ActionTaken", label: "Action" },

            { key: "AlertTimestamp", label: "Date" },

        ],

    },

    "workshop-workload": {

        title: "Workshop Workload",

        api: getWorkshopWorkload,

        columns: [

            { key: "Mechanic", label: "Mechanic" },

            { key: "Workshop", label: "Workshop" },

            { key: "Jobs", label: "Assigned Jobs" },

        ],

    },

    "high-risk-drivers": {

        title: "High Risk Drivers",

        api: getHighRiskDrivers,

        columns: [

            { key: "DriverID", label: "Driver ID" },

            { key: "FullName", label: "Driver" },

            { key: "FinalScore", label: "Score" },

            { key: "TotalPenalty", label: "Penalty" },

            { key: "CriticalEventCount", label: "Critical Events" },

            { key: "RequiresCoaching", label: "Coaching" },

        ],

    },
    "licence-expiry": {

    title: "Licence Expiry",

    api: getLicenceExpiry,

    columns: [

        {

            key: "DriverID",

            label: "Driver ID",

        },

        {

            key: "FullName",

            label: "Driver",

        },

        {

            key: "Licence",

            label: "Licence",

        },

        {

            key: "ExpiryDate",

            label: "Expiry Date",

        },

    ],

},

"vehicle-downtime": {

    title: "Vehicle Downtime",

    api: getVehicleDowntime,

    columns: [

        { key: "VIN", label: "VIN" },

        { key: "Model", label: "Model" },

        { key: "Downtime", label: "Hours" },

        { key: "Status", label: "Status" },

    ],

},

"parts-threshold": {

    title: "Parts Threshold",

    api: getPartsThreshold,

    columns: [

        {
            key: "Part",
            label: "Part",
        },

        {
            key: "Stock",
            label: "Stock",
        },

        {
            key: "Threshold",
            label: "Threshold",
        },

    ],

},

"supplier-performance": {

    title: "Supplier Performance",

    api: getSupplierPerformance,

    columns: [

        { key: "Supplier", label: "Supplier" },

        { key: "LeadTime", label: "Lead Time" },

        { key: "Parts", label: "Parts" },

    ],

},

"high-risk-drivers": {

    title: "High Risk Drivers",

    api: getHighRiskDrivers,

    columns: [

        { key: "DriverID", label: "ID" },

        { key: "FullName", label: "Driver" },

        { key: "FinalScore", label: "Score" },

        { key: "TotalPenalty", label: "Penalty" },

        { key: "CriticalEventCount", label: "Critical" },

        { key: "RequiresCoaching", label: "Coaching" },

    ],

},

"licence-expiry": {

    title: "Licence Expiry",

    api: getLicenceExpiry,

    columns: [

        { key: "DriverID", label: "ID" },

        { key: "FullName", label: "Driver" },

        { key: "Licence", label: "Licence" },

        { key: "ExpiryDate", label: "Expiry" },

    ],

},

"cost-by-model": {

    title: "Cost By Model",

    api: getCostByModel,

    columns: [

        {
            key: "Model",
            label: "Vehicle Model",
        },

        {
            key: "Cost",
            label: "Maintenance Cost (VND)",
        },

    ],

},
"driver-incidents": {

    title: "Driver Incidents",

    api: getDriverIncidents,

    columns: [

        { key: "Driver", label: "Driver" },

        { key: "VIN", label: "Vehicle" },

        { key: "Event", label: "Incident" },

        { key: "Severity", label: "Severity" },

        { key: "Date", label: "Date" },

    ],

},

"unresolved-incidents": {

    title: "Unresolved Incidents",

    api: getUnresolvedIncidents,

    columns: [

        { key: "Driver", label: "Driver" },

        { key: "Event", label: "Incident" },

        { key: "Severity", label: "Severity" },

        { key: "Status", label: "Review Status" },

    ],

},
"retraining-required": {

    title: "Retraining Required",

    api: getRetrainingRequired,

    columns: [

        { key: "Driver", label: "Driver" },

        { key: "Score", label: "Safety Score" },

        { key: "Penalty", label: "Penalty" },

        { key: "Critical", label: "Critical Events" },

    ],

},

"depot-safety-trends": {

    title: "Depot Safety Trends",

    api: getDepotSafetyTrends,

    columns: [

        { key: "Depot", label: "Depot" },

        { key: "Incidents", label: "Incidents" },

        { key: "AveragePenalty", label: "Average Penalty" },

    ],

},


};

export default function ReportViewer() {

    const { report } = useParams();

    const config = REPORT_CONFIG[report];

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!config) return;

        loadData();

    }, [report]);

    async function loadData() {

        setLoading(true);

        try {

            const data = await config.api();

            setRows(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (!config) {

        return (

            <Typography variant="h5">

                Report not found.

            </Typography>

        );

    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <GenericReportTable

            title={config.title}

            columns={config.columns}

            rows={rows}

            renderCell={(key, row) => {

                switch (key) {

                    case "Severity":

                        return (

                            <Chip

                                label={row.Severity}

                                color={getSeverityColor(row.Severity)}

                            />

                        );

                    case "AlertStatus":

                        return (

                            <Chip

                                label={row.AlertStatus}

                                color={getStatusColor(row.AlertStatus)}

                            />

                        );

                    case "AlertTimestamp":

                        return row.AlertTimestamp?.substring(0, 10);

                    case "ExpiryDate":

                        return row.ExpiryDate?.substring(0, 10);

                    case "RequiresCoaching":

                        return (

                            <Chip

                                label={row.RequiresCoaching ? "Yes" : "No"}

                                color={row.RequiresCoaching ? "warning" : "success"}

                            />

                        );

                    default:

                        return row[key];

                }

            }}

        />

    );

}