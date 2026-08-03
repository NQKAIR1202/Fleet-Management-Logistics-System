import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function VehicleActionButtons({
  vehicle,
  onView,
  onEdit,
  onDelete,

  canEdit,

  canDelete,

}) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      justifyContent="center"
    >
      <Tooltip title="View Details">
        <IconButton
          color="primary"
          onClick={() => onView(vehicle)}
          size="small"
          sx={{
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {
    canEdit && (

        <Tooltip title="Edit">

            <IconButton
                color="warning"
                onClick={() => onEdit(vehicle)}
                size="small"
                sx={{
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >

                <EditIcon fontSize="small" />

            </IconButton>

        </Tooltip>

    )
}

      {
    canDelete && (

        <Tooltip title="Delete">

            <IconButton
                color="error"
                onClick={() => onDelete(vehicle)}
                size="small"
                sx={{
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >

                <DeleteIcon fontSize="small" />

            </IconButton>

        </Tooltip>

    )
}
    </Stack>
  );
}

export default VehicleActionButtons;