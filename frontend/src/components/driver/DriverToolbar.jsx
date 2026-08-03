import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";

const DriverToolbar = ({
    search,
    setSearch,
    status,
    setStatus,
    depot,
    setDepot,
    licence,
    setLicence,
    depots,
    onAddClick,

    canCreate,

}) => {

    const handleReset = () => {
        setSearch("");
        setStatus("");
        setDepot("");
        setLicence("");
    };

    return (

        <Box>

            <TextField
                fullWidth
                placeholder="Search Driver Name, Phone, Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                    },
                }}
            />

            <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={2}
                alignItems="center"
            >

                <FormControl fullWidth>

                    <InputLabel>Status</InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="">All Status</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="On Leave">On Leave</MenuItem>
                        <MenuItem value="Suspended">Suspended</MenuItem>
                    </Select>

                </FormControl>

                <FormControl fullWidth>

                    <InputLabel>Depot</InputLabel>

                    <Select
                        value={depot}
                        label="Depot"
                        onChange={(e) => setDepot(e.target.value)}
                    >
                        <MenuItem value="">All Depots</MenuItem>

                        {depots.map((item) => (
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))}

                    </Select>

                </FormControl>

                <FormControl fullWidth>

                    <InputLabel>Licence</InputLabel>

                    <Select
                        value={licence}
                        label="Licence"
                        onChange={(e) => setLicence(e.target.value)}
                    >
                        <MenuItem value="">All Licence</MenuItem>
                        <MenuItem value="B2">B2</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="FC">FC</MenuItem>
                    </Select>

                </FormControl>

                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleReset}
                    sx={{
                        height: 56,
                        minWidth: 120,
                        borderRadius: 3,
                        flexShrink: 0,
                    }}
                >
                    Reset
                </Button>

                {
                    canCreate && (

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onAddClick}
                            sx={{
                                height: 56,
                                minWidth: 160,
                                borderRadius: 3,
                                flexShrink: 0,
                            }}
                        >
                            Add Driver
                        </Button>

                    )
                }

            </Stack>

        </Box>

    );

};

export default DriverToolbar;