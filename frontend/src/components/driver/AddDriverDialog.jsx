import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    createDriver,
    getDepots,
} from "../../services/driverService";

const initialForm = {

    FullName: "",

    DepotID: "",

    LicenceType: "",

    Phone: "",

    Email: "",

    LicenceExpiryDate: "",

    EmploymentStatus: "Active",

    EmergencyContact: "",

};

export default function AddDriverDialog({

    open,

    onClose,

    onSuccess,

}) {

    const [form, setForm] = useState(initialForm);

    const [depots, setDepots] = useState([]);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: "",

    });

    useEffect(() => {

        if (!open) return;

        loadDepots();

        setForm(initialForm);

        setErrors({});

    }, [open]);

    async function loadDepots() {

        try {

            const data = await getDepots();

            setDepots(data);

        }

        catch (err) {

            console.error(err);

        }

    }

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((prev) => ({

            ...prev,

            [name]: value,

        }));

        if (errors[name]) {

            setErrors((prev) => ({

                ...prev,

                [name]: "",

            }));

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

                        Add Driver

                    </Typography>

                </DialogTitle>

                <DialogContent>

                    <Stack spacing={6}>

                        {/* Full Name */}

                        <TextField
                            fullWidth
                            label="Full Name"
                            name="FullName"
                            value={form.FullName}
                            onChange={handleChange}
                            error={!!errors.FullName}
                            helperText={errors.FullName}
                        />

                        {/* Depot + Licence */}

                        <Box
    sx={{
        display: "flex",
        gap: 3,
    }}
>

                        <Box
                            sx={{
                                flex: 1,
                            }}
                        >

                            <FormControl
                                fullWidth
                                error={!!errors.DepotID}
                            >

                                <InputLabel>
                                    Depot
                                </InputLabel>

                                <Select
                                    label="Depot"
                                    name="DepotID"
                                    value={form.DepotID}
                                    onChange={handleChange}
                                >

                                    {
                                        depots.map((depot) => (

                                            <MenuItem
                                                key={depot.DepotID}
                                                value={depot.DepotID}
                                            >
                                                {depot.DepotName}
                                            </MenuItem>

                                        ))
                                    }

                                </Select>

                            </FormControl>
                            
                            </Box>

                            <Box
    sx={{
        flex: 1,
    }}
>


                            <FormControl
                                fullWidth
                                error={!!errors.LicenceType}
                            >

                                <InputLabel>
                                    Licence Type
                                </InputLabel>

                                <Select
                                    label="Licence Type"
                                    name="LicenceType"
                                    value={form.LicenceType}
                                    onChange={handleChange}
                                >

                                    <MenuItem value="B2">
                                        B2
                                    </MenuItem>

                                    <MenuItem value="C">
                                        C
                                    </MenuItem>

                                    <MenuItem value="FC">
                                        FC
                                    </MenuItem>

                                </Select>

                            </FormControl>
                        </Box>

                        </Box>

                        {/* Phone + Email */}

                        <Box
    sx={{
        display: "flex",
        gap: 3,
    }}
>
                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >
                            <TextField
                                fullWidth
                                label="Phone"
                                name="Phone"
                                value={form.Phone}
                                onChange={handleChange}
                            />

                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >

                            <TextField
                                fullWidth
                                label="Email"
                                name="Email"
                                value={form.Email}
                                onChange={handleChange}
                            />
                            </Box>

                        </Box>

                                                {/* Expiry + Status */}

                        <Box
    sx={{
        display: "flex",
        gap: 3,
    }}
>

                        <Box
                            sx={{
                                flex: 1,
                            }}
                        >

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    Licence Expiry
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="date"
                                    name="LicenceExpiryDate"
                                    value={form.LicenceExpiryDate}
                                    onChange={handleChange}
                                />
                            

                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >
                            <FormControl
                                fullWidth
                                sx={{ flex: 1 }}
                            >

                                <InputLabel>
                                    Employment Status
                                </InputLabel>

                                <Select
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

                                </Select>

                            </FormControl>
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

                    </Stack>

                </DialogContent>
                                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                    }}
                >

                    <Button
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Adding..."
                                : "Add Driver"
                        }
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

    async function handleSubmit() {

        const newErrors = {};

        if (!form.FullName.trim()) {

            newErrors.FullName = "Full Name is required";

        }

        if (!form.DepotID) {

            newErrors.DepotID = "Please select a depot";

        }

        if (!form.LicenceType) {

            newErrors.LicenceType = "Please select a licence";

        }

        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);

            return;

        }

        setLoading(true);

        try {

            const payload = {

                FullName: form.FullName.trim(),

                DepotID: Number(form.DepotID),

                LicenceType: form.LicenceType,

                ContactInfo:
                    `${form.Phone.trim()}|${form.Email.trim()}`,

                LicenceExpiryDate:
                    form.LicenceExpiryDate || null,

                EmploymentStatus:
                    form.EmploymentStatus,

                EmergencyContact:
                    form.EmergencyContact.trim(),

            };

            await createDriver(payload);

            setSnackbar({

                open: true,

                severity: "success",

                message: "Driver added successfully.",

            });

            if (onSuccess) {

                await onSuccess();

            }

            setTimeout(() => {

                onClose();

            }, 600);

        }

        catch (err) {

            console.error(err);

            setSnackbar({

                open: true,

                severity: "error",

                message: "Failed to add driver.",

            });

        }

        finally {

            setLoading(false);

        }

    }

}