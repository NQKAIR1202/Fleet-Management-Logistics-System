import Chip from "@mui/material/Chip";

function MaintenanceStatusChip({ status }) {

    function getColor() {

        switch (status) {

            case "Open":
                return "primary";

            case "In Progress":
                return "warning";

            case "Completed":
                return "success";

            case "Cancelled":
                return "error";

            default:
                return "default";

        }

    }

    return (

        <Chip
            label={status}
            color={getColor()}
            size="small"
            variant="filled"
            sx={{
                fontWeight: 600,
                minWidth: 120,
            }}
        />

    );

}

export default MaintenanceStatusChip;