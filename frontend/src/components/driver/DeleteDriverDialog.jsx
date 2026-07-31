import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

export default function DeleteDriverDialog({

    open,

    onClose,

    onConfirm,

    loading,

    driverName,

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>

                Delete Driver

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Are you sure you want to delete

                    <strong>

                        {" "}{driverName}

                    </strong>

                    ?

                </Typography>

                <Typography
                    color="error"
                    mt={2}
                >

                    This action cannot be undone.

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={loading}
                >

                    {loading ? "Deleting..." : "Delete"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}