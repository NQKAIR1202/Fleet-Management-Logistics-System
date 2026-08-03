import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";

import { getPredictiveAlerts } from "../../services/reportService";

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

export default function PredictiveAlertsTable() {

    const [alerts, setAlerts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAlerts();

    }, []);

    async function loadAlerts() {

        try {

            const data = await getPredictiveAlerts();

            console.log(data);

            setAlerts(data);

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

            <Paper sx={{ p:4, borderRadius:5 }}>

                <CircularProgress />

            </Paper>

        );

    }

    return (

        <Paper
            elevation={3}
            sx={{
                p:3,
                borderRadius:2,
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >

                Predictive Alerts

            </Typography>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>VIN</TableCell>

                            <TableCell>Alert Type</TableCell>

                            <TableCell>Severity</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Action</TableCell>

                            <TableCell>Date</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            alerts.map((row) => (

                                <TableRow key={row.AlertID} hover>

                                    <TableCell>

                                        {row.VIN}

                                    </TableCell>

                                    <TableCell>

                                        {row.AlertType}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={row.Severity}
                                            color={getSeverityColor(row.Severity)}
                                        />

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={row.AlertStatus}
                                            color={getStatusColor(row.AlertStatus)}
                                        />

                                    </TableCell>

                                    <TableCell>

                                        {row.ActionTaken}

                                    </TableCell>

                                    <TableCell>

                                        {row.AlertTimestamp?.substring(0,10)}

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}