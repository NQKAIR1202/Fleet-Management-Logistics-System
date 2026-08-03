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
    CircularProgress,

} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import { useMemo, useState } from "react";

function formatDate(dateString) {

    if (!dateString) return "-";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

}

function shortenVIN(vin) {

    if (!vin) return "-";

    if (vin.length <= 12) return vin;

    return `${vin.slice(0, 8)}...${vin.slice(-4)}`;

}

function SeverityChip({ severity }) {

    const colors = {
        Low: "success",
        Medium: "info",
        High: "warning",
        Critical: "error",
    };

    return (
        <Chip
            size="small"
            label={severity}
            color={colors[severity] || "default"}
            sx={{
                minWidth: 90,
                fontWeight: 700,
                borderRadius: 2,
            }}
        />
    );

}

function StatusChip({ status }) {


    const colors = {
        Pending: "warning",
        Open: "error",
        Investigating: "warning",
        "In Progress": "warning",
        Resolved: "success",
        Closed: "success",
    };

    return (
        <Chip
            size="small"
            variant="outlined"
            label={status}
            color={colors[status] || "default"}
            sx={{
                minWidth: 100,
                borderRadius: 5,
                fontWeight: 600,
            }}
        />
    );

}

export default function IncidentTable({

    incidents = [],

    loading = false,

    onView,

    onEdit,

    onDelete,

    canEdit,

    canDelete,

}) {

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);


    const visibleRows = useMemo(() => {

        return incidents.slice(

            page * rowsPerPage,

            page * rowsPerPage + rowsPerPage

        );

    }, [incidents, page, rowsPerPage]);

    return (

        <Paper

            elevation={0}

            sx={{


                borderRadius: 1,


                overflow: "hidden",

                border: "1px solid",

                borderColor: "divider",


                bgcolor: "background.paper",


            }}

        >

            <TableContainer>

                <Table stickyHeader>

                    <TableHead>


                        <TableRow

                            sx={{

                                bgcolor: "#243447",

                                "& th": {

                                    color: "#fff",

                                    fontWeight: 700,

                                    fontSize: 14,

                                    whiteSpace: "nowrap",

                                },

                            }}

                        >

                            <TableCell>ID</TableCell>

                            <TableCell>Date</TableCell>

                            <TableCell>VIN</TableCell>

                            <TableCell>Driver</TableCell>

                            <TableCell>Event Type</TableCell>

                            <TableCell align="center">

                                Severity


                            </TableCell>

                            <TableCell align="center">

                                Status

                            </TableCell>

                            <TableCell align="center">

                                Action

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>


                        {loading ? (


                            <TableRow>

                                <TableCell


                                    colSpan={8}

                                    align="center"

                                    sx={{ py: 8 }}

                                >

                                    <CircularProgress />

                                </TableCell>

                            </TableRow>

                        ) : visibleRows.length === 0 ? (

                            <TableRow>

                                <TableCell

                                    colSpan={8}

                                    align="center"

                                    sx={{ py: 8 }}

                                >

                                    <Typography

                                        variant="h6"

                                        color="text.secondary"

                                    >

                                        No safety incidents found

                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            visibleRows.map((incident, index) => (                             

                                <TableRow

                                    key={incident.incidentID}

                                    hover

                                    sx={{

                                        transition: "0.2s",

                                        bgcolor:
                                            index % 2 === 0
                                                ? "background.paper"
                                                : "action.hover",

                                        "&:hover": {

                                            bgcolor: "action.hover",

                                        },

                                    }}

                                >

                                    <TableCell>

                                        {incident.incidentID}

                                    </TableCell>

                                    <TableCell>

                                        {formatDate(incident.date)}

                                    </TableCell>

                                    <TableCell>

                                        <Tooltip

                                            title={incident.vin}

                                        >

                                            <Typography

                                                fontFamily="monospace"

                                            >

                                                {shortenVIN(

                                                    incident.vin

                                                )}

                                            </Typography>

                                        </Tooltip>

                                    </TableCell>

                                    <TableCell>

                                        {incident.driver}

                                    </TableCell>

                                    <TableCell>

                                        {incident.eventType}

                                    </TableCell>

                                    <TableCell

                                        align="center"

                                    >

                                        <SeverityChip

                                            severity={

                                                incident.severity

                                            }

                                        />

                                    </TableCell>

                                    <TableCell

                                        align="center"

                                    >

                                        <StatusChip

                                            status={

                                                incident.status

                                            }

                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Tooltip title="View Details">

                                            <IconButton
                                                color="primary"
                                                onClick={() => onView?.(incident)}
                                            >

                                                <VisibilityIcon />

                                            </IconButton>

                                        </Tooltip>

                                        {canEdit && (

                                            <Tooltip title="Edit">

                                                <IconButton
                                                    color="warning"
                                                    onClick={() => onEdit?.(incident)}
                                                >

                                                    <EditIcon />

                                                </IconButton>

                                            </Tooltip>

                                        )}

                                        {canDelete && (

                                            <Tooltip title="Delete">

                                                <IconButton
                                                    color="error"
                                                    onClick={() => onDelete?.(incident)}
                                                >

                                                    <DeleteIcon />

                                                </IconButton>

                                            </Tooltip>

                                        )}

                                    </TableCell>

                                </TableRow>

                            ))


                        )}

                    </TableBody>


                </Table>

            </TableContainer>


            <TablePagination

                component="div"

                count={incidents.length}

                page={page}

                rowsPerPage={rowsPerPage}

                rowsPerPageOptions={[10, 20, 50, 100]}

                onPageChange={(

                    event,

                    newPage

                ) => {

                    setPage(newPage);

                }}

                onRowsPerPageChange={(

                    event

                ) => {

                    setRowsPerPage(

                        parseInt(

                            event.target.value,

                            10

                        )

                    );

                    setPage(0);

                }}

                sx={{

                    borderTop: "1px solid",

                    borderColor: "divider",

                    bgcolor:

                        "background.default",

                }}

            />


        </Paper>

    );

}
