import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TablePagination,
    Chip,
    IconButton,
    Tooltip,
    Typography,
    Box,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useState } from "react";

function SeverityChip({ severity }) {

    let color = "default";

    switch (severity) {

        case "Critical":
            color = "error";
            break;

        case "High":
            color = "warning";
            break;

        case "Medium":
            color = "info";
            break;

        case "Low":
            color = "success";
            break;

        default:
            color = "default";

    }

    return (

        <Chip
            label={severity}
            color={color}
            size="small"
            variant="filled"
        />

    );

}

function StatusChip({ status }) {

    let color = "default";

    switch (status) {

        case "Resolved":
            color = "success";
            break;

        case "Investigating":
            color = "warning";
            break;

        case "Open":
            color = "error";
            break;

        default:
            color = "default";

    }

    return (

        <Chip
            label={status}
            color={color}
            size="small"
            variant="outlined"
        />

    );

}

function IncidentTable({

    incidents = [],

    onView,

}) {
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius: 2,

                boxShadow: 2,

                overflow: "hidden",

                border: "1px solid",

                borderColor: "divider",

            }}

        >

            <TableContainer>
                <TablePagination

                    component="div"

                    count={incidents.length}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    onPageChange={handleChangePage}

                    onRowsPerPageChange={handleChangeRowsPerPage}

                    rowsPerPageOptions={[5, 10, 20]}

                />

                <Table>

                    <TableHead>
                        <TableHead
                            sx={{
                                backgroundColor: "grey.100",
                            }}
                        ></TableHead>

                        <TableRow>

                            <TableCell>

                                <strong>ID</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Date</strong>

                            </TableCell>

                            <TableCell>

                                <strong>VIN</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Driver</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Event Type</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Severity</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Status</strong>

                            </TableCell>

                            <TableCell align="center">
                                <strong>Actions</strong>
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {incidents.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={8}
                                    align="center"
                                    sx={{
                                        py: 6,
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                        >

                                            No safety incidents found.

                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >

                                            Try changing your search or filters.

                                        </Typography>

                                    </Box>

                                </TableCell>

                            </TableRow>

                        ) : (

                            incidents
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((incident) => (

                                    <TableRow
                                        hover
                                        key={incident.incidentID}
                                    >

                                        <TableCell>

                                            {incident.incidentID}

                                        </TableCell>

                                        <TableCell>

                                            {incident.date}

                                        </TableCell>

                                        <TableCell>

                                            {incident.vin}

                                        </TableCell>

                                        <TableCell>

                                            {incident.driver}

                                        </TableCell>

                                        <TableCell>

                                            {incident.eventType}

                                        </TableCell>

                                        <TableCell align="center">
                                            <strong>Severity</strong>
                                        </TableCell>

                                        <TableCell align="center">
                                            <strong>Status</strong>
                                        </TableCell>

                                        <TableCell align="center">

                                            <Tooltip title="View Incident">

                                                <IconButton
                                                    color="primary"
                                                    onClick={() => onView(incident)}
                                                >

                                                    <VisibilityIcon />

                                                </IconButton>

                                            </Tooltip>

                                        </TableCell>

                                    </TableRow>

                                ))

                        )}

                    </TableBody>
                </Table>

            </TableContainer>

        </Paper>

    );

}

export default IncidentTable;