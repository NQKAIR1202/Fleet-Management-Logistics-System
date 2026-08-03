import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

function DeleteIncidentDialog({

    open,

    incident,

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

                Delete Incident

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    Are you sure you want to delete this safety incident?

                </DialogContentText>

                {incident && (

                    <Typography
                        mt={2}
                        fontWeight={700}
                    >

                        #{incident.incidentID}

                        {" - "}

                        {incident.eventType}

                    </Typography>

                )}

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

                >

                    Delete

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeleteIncidentDialog;