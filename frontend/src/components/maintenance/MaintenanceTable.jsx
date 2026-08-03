import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import MaintenanceStatusChip from "./MaintenanceStatusChip";
import MaintenanceActionButtons from "./MaintenanceActionButtons";

function MaintenanceTable({
    jobs,
    onView,
    onEdit,
    onDelete,
}) {

    return (

        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 2,
            }}
        >

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            <strong>Job ID</strong>
                        </TableCell>

                        <TableCell>
                            <strong>VIN</strong>
                        </TableCell>

                        <TableCell>
                            <strong>Workshop</strong>
                        </TableCell>

                        <TableCell>
                            <strong>Date Opened</strong>
                        </TableCell>

                        <TableCell>
                            <strong>Date Closed</strong>
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

                    {jobs.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={7}
                                align="center"
                                sx={{ py: 5 }}
                            >

                                <Typography color="text.secondary">

                                    No maintenance jobs found.

                                </Typography>

                            </TableCell>

                        </TableRow>

                    ) : (

                        jobs.map((job) => (

                            <TableRow
                                key={job.JobID}
                                hover
                            >

                                <TableCell>

                                    {job.JobID}

                                </TableCell>

                                <TableCell>

                                    {job.VIN}

                                </TableCell>

                                <TableCell>

                                    {job.WorkshopID}

                                </TableCell>

                                <TableCell>

                                    {job.DateOpened
                                        ? new Date(job.DateOpened).toLocaleString()
                                        : "-"}

                                </TableCell>

                                <TableCell>

                                    {job.DateClosed
                                        ? new Date(job.DateClosed).toLocaleString()
                                        : "-"}

                                </TableCell>

                                <TableCell>

                                    <MaintenanceStatusChip
                                        status={job.JobStatus}
                                    />

                                </TableCell>

                                <TableCell align="center">

                                    <MaintenanceActionButtons
                                        job={job}
                                        onView={onView}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default MaintenanceTable;