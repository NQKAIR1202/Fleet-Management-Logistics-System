import Chip from "@mui/material/Chip";

function VehicleStatusChip({ status }) {

    function getColor() {

        switch (status) {

            case "Available":

                return "success";

            case "Assigned":

                return "primary";

            case "Maintenance":

                return "warning";

            case "Out of Service":

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

        />

    );

}

export default VehicleStatusChip;