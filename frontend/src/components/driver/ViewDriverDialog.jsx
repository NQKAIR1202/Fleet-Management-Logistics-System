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

} from "@mui/material";

import { getDriver } from "../../services/driverService";

export default function ViewDriverDialog({

    open,

    driverId,

    onClose,

}) {

    const [driver, setDriver] = useState(null);

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

            setDriver(data);

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

                        View Driver

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
                                value={driver?.FullName || ""}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
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
                                        fullWidth
                                        label="Depot"
                                        value={driver?.Depot || ""}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Licence Type"
                                        value={driver?.LicenceType || ""}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
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
                                        label="Phone"
                                        value={
                                            driver?.ContactInfo?.split("|")[0] || ""
                                        }
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={
                                            driver?.ContactInfo?.split("|")[1] || ""
                                        }
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
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
                                        label="Licence Expiry"
                                        value={driver?.LicenceExpiryDate || ""}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                            inputLabel: {
                                                shrink: true,
                                            },
                                        }}
                                    />

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Employment Status"
                                        value={driver?.EmploymentStatus || ""}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                </Box>

                            </Box>

                            {/* Emergency Contact */}

                            <TextField
                                fullWidth
                                label="Emergency Contact"
                                value={driver?.EmergencyContact || ""}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
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
                                        value={driver?.CurrentVehicle || "Not Assigned"}
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />

                                </Box>

                                <Box sx={{ flex: 1 }}>

                                    <TextField
                                        fullWidth
                                        label="Safety Score"
                                        value={
                                            driver?.SafetyScore !== null &&
                                            driver?.SafetyScore !== undefined
                                                ? driver.SafetyScore
                                                : "N/A"
                                        }
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
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
                        variant="contained"
                        onClick={onClose}
                    >
                        Close
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