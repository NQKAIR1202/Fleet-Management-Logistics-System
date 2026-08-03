import {
    Paper,
    Stack,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

function MaintenanceToolbar({

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    onReset,

    onAdd,

    canCreate,

}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 2,
                boxShadow: 2,
            }}
        >

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={2}
                alignItems="center"
            >

                <TextField
                    fullWidth
                    label="Search Job ID or VIN"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <SearchIcon
                                sx={{
                                    mr: 1,
                                    color: "text.secondary",
                                }}
                            />
                        ),
                    }}
                />

                <TextField
                    select
                    label="Status"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                    sx={{
                        minWidth: 180,
                    }}
                >

                    <MenuItem value="All">
                        All
                    </MenuItem>

                    <MenuItem value="Open">
                        Open
                    </MenuItem>

                    <MenuItem value="In Progress">
                        In Progress
                    </MenuItem>

                    <MenuItem value="Completed">
                        Completed
                    </MenuItem>

                    <MenuItem value="Cancelled">
                        Cancelled
                    </MenuItem>

                </TextField>

                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<RefreshIcon />}
                    onClick={onReset}
                >
                    Reset
                </Button>

                {canCreate && (

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                    >
                        Add Job
                    </Button>

                )}

            </Stack>

        </Paper>

    );

}

export default MaintenanceToolbar;