import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function VehicleActionButtons({

    vehicle,

    onView,

    onEdit,

    onDelete,

}) {

    return (

        <>

            <Tooltip title="View Details">

                <IconButton
                    color="primary"
                    onClick={() => onView(vehicle)}
                >

                    <VisibilityIcon />

                </IconButton>

            </Tooltip>

            <Tooltip title="Edit">

                <IconButton
                    color="warning"
                    onClick={() => onEdit(vehicle)}
                >

                    <EditIcon />

                </IconButton>

            </Tooltip>

            <Tooltip title="Delete">

                <IconButton
                    color="error"
                    onClick={() => onDelete(vehicle)}
                >

                    <DeleteIcon />

                </IconButton>

            </Tooltip>

        </>

    );

}

export default VehicleActionButtons;