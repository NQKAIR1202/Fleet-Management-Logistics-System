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

const severityOptions = [
    "Low",
    "Medium",
    "High",
    "Critical",
];

const statusOptions = [
    "Pending",
    "Reviewed",
];

const eventOptions = [
    "Speeding",
    "Seatbelt Violation",
    "Phone Distraction",
    "Fatigue Warning",
    "Sharp Cornering",
];

function IncidentFormDialog({

    open,

    mode,

    incident,

    onClose,

    onSubmit,

}) {

    const [form, setForm] = useState({

        date: "",

        vin: "",

        driver: "",

        eventType: "",

        severity: "Low",

        status: "Pending",

        description: "",

    });

    useEffect(() => {

        if (mode === "edit" && incident) {

            setForm({

                date: incident.date ?? "",

                vin: incident.vin ?? "",

                driver: incident.driver ?? "",

                eventType: incident.eventType ?? "",

                severity: incident.severity ?? "Low",

                status: incident.status ?? "Pending",

                description:

                    incident.description ?? "",

            });

        }

        else {

            setForm({

                date: "",

                vin: "",

                driver: "",

                eventType: "",

                severity: "Low",

                status: "Pending",

                description: "",

            });

        }

    }, [incident, mode, open]);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    function handleSubmit() {

        onSubmit(form);

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {

                    mode === "add"

                        ? "Add Safety Incident"

                        : "Edit Safety Incident"

                }

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: .5 }}
                >

                    <Grid size={6}>

                        <TextField
    fullWidth
    label="Date"
    name="date"
    value={form.date}
    disabled
/>

                    </Grid>

                    <Grid size={6}>

                        <TextField
    fullWidth
    label="Vehicle VIN"
    name="vin"
    value={form.vin}
    disabled
/>

                    </Grid>

                    <Grid size={6}>

                        <TextField
    fullWidth
    label="Driver"
    name="driver"
    value={form.driver}
    disabled
/>

                    </Grid>

                    <Grid size={6}>

                        <TextField
    fullWidth
    select
    label="Event Type"
    name="eventType"
    value={form.eventType}
    disabled
>

                            {

                                eventOptions.map(event => (

                                    <MenuItem

                                        key={event}

                                        value={event}

                                    >

                                        {event}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            fullWidth

                            select

                            label="Severity"

                            name="severity"

                            value={form.severity}

                            onChange={handleChange}

                        >

                            {

                                severityOptions.map(item => (

                                    <MenuItem

                                        key={item}

                                        value={item}

                                    >

                                        {item}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            fullWidth

                            select

                            label="Status"

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                        >

                            {

                                statusOptions.map(item => (

                                    <MenuItem

                                        key={item}

                                        value={item}

                                    >

                                        {item}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={12}>

                        <TextField

                            fullWidth

                            multiline

                            rows={4}

                            label="Description"

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                        />

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

                    {

                        mode === "add"

                            ? "Add"

                            : "Save"

                    }

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default IncidentFormDialog;