import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Stack,
    Button,
} from "@mui/material";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

function ReportFilters() {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 1,
            }}
        >

            <CardContent>

                <Grid
                    container
                    spacing={4}
                >

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            select
                            label="Driver"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                All Drivers
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            select
                            label="Vehicle"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                All Vehicles
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            select
                            label="Depot"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                All Depots
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField
                            fullWidth
                            select
                            label="Severity"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                All
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <TextField
                            fullWidth
                            type="date"
                            label="From"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <TextField
                            fullWidth
                            type="date"
                            label="To"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Stack
                            direction="row"
                            spacing={2}
                            height="100%"
                            alignItems="center"
                        >

                            <Button
                                variant="contained"
                                startIcon={
                                    <FilterAltRoundedIcon />
                                }
                            >

                                Apply

                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={
                                    <RestartAltRoundedIcon />
                                }
                            >

                                Reset

                            </Button>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}

export default ReportFilters;