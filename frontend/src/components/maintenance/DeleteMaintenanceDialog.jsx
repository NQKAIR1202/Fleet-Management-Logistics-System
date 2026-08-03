import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

function DeleteMaintenanceDialog({

    open,

    job,

    onClose,

    onConfirm,

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>

                Delete Maintenance Job

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    Are you sure you want to delete this maintenance job?

                    <br />
                    <br />

                    <strong>
                        Job ID:
                    </strong>{" "}
                    {job?.JobID}

                    <br />

                    <strong>
                        VIN:
                    </strong>{" "}
                    {job?.VIN}

                    <br />

                    <strong>
                        Status:
                    </strong>{" "}
                    {job?.JobStatus}

                    <br />
                    <br />

                    This action cannot be undone.

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                >
                    Delete
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeleteMaintenanceDialog;