import { useEffect, useState } from "react";

import {

    Alert,

    Box,

    Button,

    CircularProgress,

    Dialog,

    DialogActions,

    DialogContent,

    DialogTitle,

    Snackbar,

    Stack,

    TextField,

    Typography,

    MenuItem,

} from "@mui/material";

import {
    getDriver,
    updateDriver,
    getDepots,
} from "../../services/driverService";

export default function EditDriverDialog({

    open,

    driverId,

    onClose,

    onSuccess,

}) {

const [form, setForm] = useState({

    FullName: "",

    DepotID: "",

    LicenceType: "",

    LicenceExpiryDate: "",

    EmploymentStatus: "",

    Phone: "",

    Email: "",

    EmergencyContact: "",

    CurrentVehicle: "",

    SafetyScore: "",

});

const [depots, setDepots] = useState([]);

const [saving, setSaving] = useState(false);

    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "error",

        message: "",

    });

    useEffect(() => {

        if (!open || !driverId) {

            return;

        }

        loadDriver();

    }, [open, driverId]);

    async function loadDriver() {

        setLoading(true);

        try {

            const data = await getDriver(driverId);

            setForm({

                FullName: data.FullName,

                DepotID: data.DepotID,

                LicenceType: data.LicenceType,

                LicenceExpiryDate: data.LicenceExpiryDate,

                EmploymentStatus: data.EmploymentStatus,

                Phone: data.ContactInfo?.split("|")[0] || "",

                Email: data.ContactInfo?.split("|")[1] || "",

                EmergencyContact: data.EmergencyContact,

                CurrentVehicle: data.CurrentVehicle || "",

                SafetyScore: data.SafetyScore ?? "",

            });

            const depotData = await getDepots();

            setDepots(depotData);

        }

        catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message: "Failed to load driver.",

            });

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

    }

    async function handleSave() {

    try {

        setSaving(true);

        await updateDriver(driverId, {

            FullName: form.FullName,

            DepotID: Number(form.DepotID),

            LicenceType: form.LicenceType,

            LicenceExpiryDate: form.LicenceExpiryDate,

            EmploymentStatus: form.EmploymentStatus,

            ContactInfo: `${form.Phone}|${form.Email}`,

            EmergencyContact: form.EmergencyContact,

        });

        setSnackbar({

            open: true,

            severity: "success",

            message: "Driver updated successfully.",

        });

        onSuccess();

        onClose();

    }

    catch (error) {

        console.error(error);

        setSnackbar({

            open: true,

            severity: "error",

            message: "Failed to update driver.",

        });

    }

    finally {

        setSaving(false);

    }

}

    return (

        <>

            <Dialog

                open={open}

                onClose={onClose}

                fullWidth

                maxWidth="md"

                PaperProps={{

                    sx: {

                        borderRadius: 3,

                        width: 760,

                        maxWidth: "95vw",

                    },

                }}

            >

                <DialogTitle>

                    <Typography

                        variant="h5"

                        fontWeight={700}

                    >

                        Edit Driver

                    </Typography>

                </DialogTitle>

                <DialogContent>

                    {
                        loading ? (

                            <Box

                                display="flex"

                                justifyContent="center"

                                py={6}

                            >

                                <CircularProgress />

                            </Box>

                        ) : (

                            <Stack spacing={3}>
                            {/* Full Name */}

                            <TextField
                                fullWidth
                                label="Full Name"
                                name="FullName"
                                value={form.FullName}
                                onChange={handleChange}
                            />

                            {/* Depot + Licence */}

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                }}
                            >

                                <Box sx={{ flex: 1 }}>

                                    <TextField

                                        select

                                        fullWidth

                                        label="Depot"

                                        name="DepotID"

                                        value={form.DepotID}

                                        onChange={handleChange}

                                    >

                                        {depots.map((depot) => (

                                            <MenuItem

                                                key={depot.DepotID}

                                                value={depot.DepotID}

                                            >

                                                {depot.DepotName}

                                            </MenuItem>

                                        ))}

                                    </TextField>

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField

                                        fullWidth

                                        label="Licence Type"

                                        name="LicenceType"

                                        value={form.LicenceType}

                                        onChange={handleChange}

                                    />

                                </Box>

                            </Box>

                            {/* Phone + Email */}

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                }}
                            >

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="Email"
                                        value={form.Email}
                                        onChange={handleChange}
                                    />

                                </Box>

                            </Box>

                                                        {/* Licence Expiry + Employment Status */}

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                }}
                            >

                                <Box sx={{ flex: 1 }}>

                                    <TextField

                                        fullWidth

                                        type="date"

                                        label="Licence Expiry"

                                        name="LicenceExpiryDate"

                                        value={form.LicenceExpiryDate}

                                        onChange={handleChange}

                                        slotProps={{

                                            inputLabel: {

                                                shrink: true,

                                            },

                                        }}

                                    />

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField

                                        select

                                        fullWidth

                                        label="Employment Status"

                                        name="EmploymentStatus"

                                        value={form.EmploymentStatus}

                                        onChange={handleChange}

                                    >

                                        <MenuItem value="Active">

                                            Active

                                        </MenuItem>

                                        <MenuItem value="On Leave">

                                            On Leave

                                        </MenuItem>

                                        <MenuItem value="Suspended">

                                            Suspended

                                        </MenuItem>

                                    </TextField>

                                </Box>

                            </Box>

                            {/* Emergency Contact */}

                            <TextField
                                fullWidth
                                label="Emergency Contact"
                                name="EmergencyContact"
                                value={form.EmergencyContact}
                                onChange={handleChange}
                            />

                            {/* Current Vehicle + Safety Score */}

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                }}
                            >

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Current Vehicle"
                                        value={form.CurrentVehicle || "Not Assigned"}
                                        disabled
                                    />

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Safety Score"
                                        value={form.SafetyScore === "" ? "N/A" : form.SafetyScore}
                                        disabled
                                    />

                                </Box>

                            </Box>

                        </Stack>

                    )
                }

                </DialogContent>

                                <DialogActions
                                    sx={{
                                        px: 3,
                                        pb: 3,
                                    }}
                                >

                                    <Button
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={handleSave}
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </Button>

                                </DialogActions>

            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            >

                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </>

    );

}