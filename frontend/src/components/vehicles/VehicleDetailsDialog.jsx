import {

    Dialog,

    DialogTitle,

    DialogContent,

    DialogActions,

    Button,

    Stack,

    Typography,

} from "@mui/material";

import VehicleStatusChip from "./VehicleStatusChip";

function VehicleDetailsDialog({

    open,

    vehicle,

    onClose,

}) {

    if (!vehicle) return null;

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="sm"

        >

            <DialogTitle>

                Vehicle Details

            </DialogTitle>

            <DialogContent>

                <Stack spacing={2} mt={1}>

                    <Typography>

                        <strong>VIN:</strong> {vehicle.VIN}

                    </Typography>

                    <Typography>

                        <strong>Registration:</strong> {vehicle.RegistrationNumber}

                    </Typography>

                    <Typography>

                        <strong>Manufacturer:</strong> {vehicle.Manufacturer}

                    </Typography>

                    <Typography>

                        <strong>Model:</strong> {vehicle.Model}

                    </Typography>

                    <Typography>

                        <strong>Year:</strong> {vehicle.ManufactureYear}

                    </Typography>

                    <Typography>

                        <strong>Current Odometer:</strong>{" "}

                        {vehicle.CurrentOdometer?.toLocaleString()} km

                    </Typography>

                    <Typography>

                        <strong>Status:</strong>

                    </Typography>

                    <VehicleStatusChip

                        status={vehicle.OperationalStatus}

                    />

                </Stack>

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

export default VehicleDetailsDialog;