import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";

function SafetyToolbar({

    search,
    setSearch,

    severityFilter,
    setSeverityFilter,

    eventTypeFilter,
    setEventTypeFilter,

    statusFilter,
    setStatusFilter,

    onReset,

    onExport,

}) {

    return (

        <Stack spacing={3}>

            {/* Search */}

            <TextField
                fullWidth
                placeholder="Search Incident ID, VIN, Driver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{

                    "& .MuiOutlinedInput-root": {

                        bgcolor: "background.paper",

                        borderRadius: 2,

                        "& fieldset": {

                            borderColor: "divider",

                        },

                        "&:hover fieldset": {

                            borderColor: "primary.main",

                        },

                        "&.Mui-focused fieldset": {

                            borderColor: "primary.main",

                        },

                    },

                }}
            />

            {/* Filters */}

            <Box

                sx={{

                    display: "flex",

                    flexWrap: "wrap",

                    justifyContent: "space-between",

                    alignItems: "center",

                    gap: 2,

                }}

            >

                <Box

                    sx={{

                        display: "flex",

                        flexWrap: "wrap",

                        gap: 2,

                    }}

                >

                    {/* Severity */}

                    <FormControl sx={{ minWidth: 180 }}>

                        <InputLabel>

                            Severity

                        </InputLabel>

                        <Select

                            value={severityFilter}

                            label="Severity"

                            onChange={(e) =>

                                setSeverityFilter(e.target.value)

                            }

                        >

                            <MenuItem value="All">

                                All Severity

                            </MenuItem>

                            <MenuItem value="Low">

                                Low

                            </MenuItem>

                            <MenuItem value="Medium">

                                Medium

                            </MenuItem>

                            <MenuItem value="High">

                                High

                            </MenuItem>



                        </Select>

                    </FormControl>

                    {/* Event Type */}

                    <FormControl sx={{ minWidth: 220 }}>

                        <InputLabel>

                            Event Type

                        </InputLabel>

                        <Select

                            value={eventTypeFilter}

                            label="Event Type"

                            onChange={(e) =>

                                setEventTypeFilter(e.target.value)

                            }

                        >

                            <MenuItem value="All">
                                All Events
                            </MenuItem>

                            <MenuItem value="Harsh Braking">
                                Harsh Braking
                            </MenuItem>

                            <MenuItem value="Speeding">
                                Speeding
                            </MenuItem>

                            <MenuItem value="Fatigue Warning">
                                Fatigue Warning
                            </MenuItem>

                            <MenuItem value="Rapid Acceleration">
                                Rapid Acceleration
                            </MenuItem>

                            <MenuItem value="Sharp Cornering">
                                Sharp Cornering
                            </MenuItem>

                            <MenuItem value="Engine Warning">
                                Engine Warning
                            </MenuItem>

                            <MenuItem value="Seatbelt Violation">
                                Seatbelt Violation
                            </MenuItem>

                            <MenuItem value="Phone Distraction">
                                Phone Distraction
                            </MenuItem>

                        </Select>

                    </FormControl>

                    {/* Status */}

                    <FormControl sx={{ minWidth: 180 }}>

                        <InputLabel>

                            Status

                        </InputLabel>

                        <Select

                            value={statusFilter}

                            label="Status"

                            onChange={(e) =>

                                setStatusFilter(e.target.value)

                            }

                        >

                            <MenuItem value="All">
                                All Status
                            </MenuItem>

                            <MenuItem value="Pending">
                                Pending
                            </MenuItem>

                            <MenuItem value="Reviewed">
                                Reviewed
                            </MenuItem>

                            <MenuItem value="Investigating">
                                Investigating
                            </MenuItem>

                            <MenuItem value="Resolved">
                                Resolved
                            </MenuItem>

                            <MenuItem value="Closed">
                                Closed
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Box>

                {/* Buttons */}

                <Box

                    sx={{

                        display: "flex",

                        gap: 2,

                    }}

                >

                    <Button

                        variant="outlined"

                        color="inherit"

                        startIcon={<RestartAltIcon />}

                        onClick={onReset}

                        sx={{

                            textTransform: "none",

                            borderRadius: 2,

                        }}

                    >

                        Reset

                    </Button>

                    <Button

                        variant="contained"

                        startIcon={<DownloadIcon />}

                        onClick={onExport}

                        sx={{

                            px: 3,

                            py: 1.2,

                            borderRadius: 2,

                            textTransform: "none",

                            fontWeight: 600,

                        }}

                    >

                        Export CSV

                    </Button>

                </Box>

            </Box>

        </Stack>

    );

}

export default SafetyToolbar;