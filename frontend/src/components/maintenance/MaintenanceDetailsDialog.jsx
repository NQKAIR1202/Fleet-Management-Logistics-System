import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    Typography,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Box,
    Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MaintenanceDetailsDialog({

    open,

    job,

    activities,

    onClose,

}) {

    const [expanded, setExpanded] = useState(false);

    if (!job) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >

            <DialogTitle>

                Maintenance Job Details

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 3 }}
                >

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Job ID"
                            value={job.JobID}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Vehicle VIN"
                            value={job.VIN}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Workshop"
                            value={job.WorkshopID}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Predictive Alert"
                            value={job.AlertID ?? "-"}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Opened"
                            value={
                                job.DateOpened
                                    ? new Date(
                                          job.DateOpened
                                      ).toLocaleString()
                                    : "-"
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Closed"
                            value={
                                job.DateClosed
                                    ? new Date(
                                          job.DateClosed
                                      ).toLocaleString()
                                    : "-"
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Downtime (Hours)"
                            value={
                                job.DowntimeHours ?? "-"
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Total Cost (VND)"
                            value={
                                Number(
                                    job.TotalCostVND ?? 0
                                ).toLocaleString()
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Chip
                            label={job.JobStatus}
                            color={
                                job.JobStatus === "Completed"
                                    ? "success"
                                    : job.JobStatus === "In Progress"
                                    ? "warning"
                                    : "primary"
                            }
                        />

                    </Grid>

                </Grid>

                <Divider sx={{ mb: 3 }} />

                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    Maintenance Activities
                </Typography>

                {

                    activities.length === 0 && (

                        <Typography
                            color="text.secondary"
                        >

                            No maintenance activities.

                        </Typography>

                    )

                }

                {

                    activities.map((activity) => (

                        <Accordion

                            key={activity.ActivityID}

                        >

                            <AccordionSummary

                                expandIcon={
                                    <ExpandMoreIcon />
                                }

                            >

                                <Stack
                                    direction="row"
                                    spacing={3}
                                    alignItems="center"
                                    width="100%"
                                >

                                    <Typography
                                        fontWeight={700}
                                    >

                                        #{activity.ActivityNo}

                                    </Typography>

                                    <Typography>

                                        {

                                            activity.ActivityTypeName

                                        }

                                    </Typography>

                                    <Chip

                                        label={
                                            activity.ActivityStatus
                                        }

                                        color={

                                            activity.ActivityStatus === "Completed"

                                                ? "success"

                                                : activity.ActivityStatus === "In Progress"

                                                ? "warning"

                                                : "default"

                                        }

                                    />

                                </Stack>

                            </AccordionSummary>

                            <AccordionDetails>

                                <Typography
                                    gutterBottom
                                >

                                    <strong>

                                        Diagnosis:

                                    </strong>{" "}

                                    {

                                        activity.DiagnosticResult ||

                                        "-"

                                    }

                                </Typography>

                                <Typography
                                    gutterBottom
                                >

                                    <strong>

                                        Repeat Fault:

                                    </strong>{" "}

                                    {

                                        activity.RepeatFault

                                            ? "Yes"

                                            : "No"

                                    }

                                </Typography>

                                <Typography
                                    gutterBottom
                                >

                                    <strong>

                                        Warranty:

                                    </strong>{" "}

                                    {

                                        activity.WarrantyIndicator

                                            ? "Yes"

                                            : "No"

                                    }

                                </Typography>

                                <Divider
                                    sx={{ my: 2 }}
                                />

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                    gutterBottom
                                >

                                    Mechanics

                                </Typography>
                                                                <Table
                                    size="small"
                                    sx={{ mb: 3 }}
                                >

                                    <TableHead>

                                        <TableRow>

                                            <TableCell>

                                                Name

                                            </TableCell>

                                            <TableCell>

                                                Role

                                            </TableCell>

                                            <TableCell>

                                                Specialisation

                                            </TableCell>

                                            <TableCell
                                                align="right"
                                            >

                                                Hours

                                            </TableCell>

                                        </TableRow>

                                    </TableHead>

                                    <TableBody>

                                        {

                                            activity.mechanics
                                                ?.length ? (

                                                activity.mechanics.map(

                                                    (

                                                        mechanic

                                                    ) => (

                                                        <TableRow

                                                            key={
                                                                mechanic.MechanicID
                                                            }

                                                        >

                                                            <TableCell>

                                                                {

                                                                    mechanic.FullName

                                                                }

                                                            </TableCell>

                                                            <TableCell>

                                                                {

                                                                    mechanic.RoleInActivity

                                                                }

                                                            </TableCell>

                                                            <TableCell>

                                                                {

                                                                    mechanic.Specialisation

                                                                }

                                                            </TableCell>

                                                            <TableCell
                                                                align="right"
                                                            >

                                                                {

                                                                    mechanic.LabourHours

                                                                }

                                                                h

                                                            </TableCell>

                                                        </TableRow>

                                                    )

                                                )

                                            ) : (

                                                <TableRow>

                                                    <TableCell
                                                        colSpan={
                                                            4
                                                        }
                                                        align="center"
                                                    >

                                                        No mechanics assigned.

                                                    </TableCell>

                                                </TableRow>

                                            )

                                        }

                                    </TableBody>

                                </Table>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                    gutterBottom
                                >

                                    Parts Used

                                </Typography>

                                <Table
                                    size="small"
                                >

                                    <TableHead>

                                        <TableRow>

                                            <TableCell>

                                                Part

                                            </TableCell>

                                            <TableCell
                                                align="center"
                                            >

                                                Qty

                                            </TableCell>

                                            <TableCell
                                                align="right"
                                            >

                                                Unit Cost

                                            </TableCell>

                                            <TableCell
                                                align="right"
                                            >

                                                Stock

                                            </TableCell>

                                        </TableRow>

                                    </TableHead>

                                    <TableBody>

                                        {

                                            activity.parts
                                                ?.length ? (

                                                activity.parts.map(

                                                    (

                                                        part

                                                    ) => (

                                                        <TableRow

                                                            key={
                                                                part.PartID
                                                            }

                                                        >

                                                            <TableCell>

                                                                {

                                                                    part.PartName

                                                                }

                                                            </TableCell>

                                                            <TableCell
                                                                align="center"
                                                            >

                                                                {

                                                                    part.QuantityUsed

                                                                }

                                                            </TableCell>

                                                            <TableCell
                                                                align="right"
                                                            >

                                                                {

                                                                    Number(

                                                                        part.UnitCostAtTime

                                                                    ).toLocaleString()

                                                                }

                                                            </TableCell>

                                                            <TableCell
                                                                align="right"
                                                            >

                                                                {

                                                                    part.StockQuantity

                                                                }

                                                            </TableCell>

                                                        </TableRow>

                                                    )

                                                )

                                            ) : (

                                                <TableRow>

                                                    <TableCell
                                                        colSpan={
                                                            4
                                                        }
                                                        align="center"
                                                    >

                                                        No parts used.

                                                    </TableCell>

                                                </TableRow>

                                            )

                                        }

                                    </TableBody>

                                </Table>

                            </AccordionDetails>

                        </Accordion>

                    ))

                }

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    variant="contained"
                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default MaintenanceDetailsDialog;