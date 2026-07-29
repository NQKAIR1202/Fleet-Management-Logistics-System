import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Chip,
    Divider,
    Box,
} from "@mui/material";

function SeverityChip({ severity }) {

    let color = "default";

    switch (severity) {

        case "Critical":
            color = "error";
            break;

        case "High":
            color = "warning";
            break;

        case "Medium":
            color = "info";
            break;

        case "Low":
            color = "success";
            break;

        default:
            color = "default";

    }

    return (
        <Chip
            label={severity}
            color={color}
            size="small"
        />
    );

}

function StatusChip({ status }) {

    let color = "default";

    switch (status) {

        case "Resolved":
            color = "success";
            break;

        case "Investigating":
            color = "warning";
            break;

        case "Open":
            color = "error";
            break;

        default:
            color = "default";

    }

    return (
        <Chip
            label={status}
            color={color}
            size="small"
            variant="outlined"
        />
    );

}

function DetailItem({ label, children }) {

    return (

        <Box>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Box mt={0.5}>
                {children}
            </Box>

        </Box>

    );

}

function IncidentDialog({

    open,

    incident,

    onClose,

}) {

    if (!incident) {

        return null;

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                Incident Details

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid item xs={12} md={6}>

                        <DetailItem label="Incident ID">

                            <Typography>

                                {incident.incidentID}

                            </Typography>

                        </DetailItem>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <DetailItem label="Date">

                            <Typography>

                                {incident.date}

                            </Typography>

                        </DetailItem>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <DetailItem label="Vehicle VIN">

                            <Typography>

                                {incident.vin}

                            </Typography>

                        </DetailItem>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <DetailItem label="Driver">

                            <Typography>

                                {incident.driver}

                            </Typography>

                        </DetailItem>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid item xs={12} md={6}>

                        <DetailItem label="Event Type">

                            <Typography>

                                {incident.eventType}

                            </Typography>

                        </DetailItem>

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <DetailItem label="Severity">

                            <SeverityChip

                                severity={incident.severity}

                            />

                        </DetailItem>

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <DetailItem label="Status">

                            <StatusChip

                                status={incident.status}

                            />

                        </DetailItem>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <DetailItem label="Description">

                    <Typography>

                        {incident.description ||
                            "No description available."}

                    </Typography>

                </DetailItem>

            </DialogContent>

            <DialogActions>

                <Button

                    variant="contained"

                    onClick={onClose}

                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default IncidentDialog;