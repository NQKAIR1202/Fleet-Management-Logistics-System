import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

function MaintenanceFormDialog({

    open,

    mode,

    job,

    onClose,

    onSubmit,

}) {

    const [form, setForm] = useState({

        VIN: "",

        WorkshopID: "",

        AlertID: "",

        DateOpened: "",

        JobStatus: "Open",

    });

    useEffect(() => {

        if (mode === "edit" && job) {

            setForm({

                VIN: job.VIN ?? "",

                WorkshopID: job.WorkshopID ?? "",

                AlertID: job.AlertID ?? "",

                DateOpened: job.DateOpened
                    ? job.DateOpened.slice(0, 16)
                    : "",

                JobStatus: job.JobStatus ?? "Open",

            });

        }

        if (mode === "add") {

            setForm({

                VIN: "",

                WorkshopID: "",

                AlertID: "",

                DateOpened: "",

                JobStatus: "Open",

            });

        }

    }, [job, mode, open]);

    function handleChange(e) {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

    }

    function handleSubmit() {

        onSubmit({

            VIN: form.VIN,

            WorkshopID: Number(form.WorkshopID),

            AlertID:
                form.AlertID === ""
                    ? null
                    : Number(form.AlertID),

            DateOpened: form.DateOpened,

            JobStatus: form.JobStatus,

        });

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                {mode === "add"

                    ? "Add Maintenance Job"

                    : "Edit Maintenance Job"}

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 0.5 }}
                >

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Vehicle VIN"
                            name="VIN"
                            value={form.VIN}
                            onChange={handleChange}
                            disabled={mode === "edit"}
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Workshop ID"
                            name="WorkshopID"
                            type="number"
                            value={form.WorkshopID}
                            onChange={handleChange}
                            disabled={mode === "edit"}
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Predictive Alert ID"
                            name="AlertID"
                            type="number"
                            value={form.AlertID}
                            onChange={handleChange}
                            disabled={mode === "edit"}
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Opened Date"
                            name="DateOpened"
                            type="datetime-local"
                            value={form.DateOpened}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={mode === "edit"}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            select
                            label="Job Status"
                            name="JobStatus"
                            value={form.JobStatus}
                            onChange={handleChange}
                        >

                            <MenuItem value="Open">
                                Open
                            </MenuItem>

                            <MenuItem value="In Progress">
                                In Progress
                            </MenuItem>

                            <MenuItem value="Completed">
                                Completed
                            </MenuItem>

                            <MenuItem value="Cancelled">
                                Cancelled
                            </MenuItem>

                        </TextField>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {mode === "add"

                        ? "Create"

                        : "Save"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default MaintenanceFormDialog;