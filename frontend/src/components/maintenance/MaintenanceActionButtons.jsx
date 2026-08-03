import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuth } from "../../context/AuthContext";

import {
    canEdit,
    canDelete,
} from "../../utils/permissions";

function MaintenanceActionButtons({

    job,

    onView,

    onEdit,

    onDelete,

}) {

    const { user } = useAuth();

    return (

        <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
        >

            <Tooltip title="View">

                <IconButton
                    color="primary"
                    onClick={() => onView(job)}
                >

                    <VisibilityIcon fontSize="small"/>

                </IconButton>

            </Tooltip>

            {canEdit(user) && (

                <Tooltip title="Edit">

                    <IconButton
                        color="warning"
                        onClick={() => onEdit(job)}
                    >

                        <EditIcon fontSize="small"/>

                    </IconButton>

                </Tooltip>

            )}

            {canDelete(user) && (

                <Tooltip title="Delete">

                    <IconButton
                        color="error"
                        onClick={() => onDelete(job)}
                    >

                        <DeleteIcon fontSize="small"/>

                    </IconButton>

                </Tooltip>

            )}

        </Stack>

    );

}

export default MaintenanceActionButtons;