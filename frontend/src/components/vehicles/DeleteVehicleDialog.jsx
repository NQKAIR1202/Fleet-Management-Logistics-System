import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

function DeleteVehicleDialog({

    open,

    vehicle,

    onClose,

    onConfirm,

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
        >

            <DialogTitle>

                Delete Vehicle

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    Are you sure you want to delete this vehicle?

                    <br /><br />

                    <strong>

                        {vehicle?.RegistrationNumber}

                    </strong>

                    <br />

                    VIN: {vehicle?.VIN}

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button

                    color="error"

                    variant="contained"

                    onClick={onConfirm}

                >

                    Delete

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeleteVehicleDialog;