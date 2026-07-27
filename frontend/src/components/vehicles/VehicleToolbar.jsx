import {

    Box,

    Button,

    TextField,

} from "@mui/material";

function VehicleToolbar({

    search,

    setSearch,

    onAdd,

}) {

    return (

        <Box

            display="flex"

            justifyContent="space-between"

            alignItems="center"

            mb={3}

            gap={2}

        >

            <TextField

                fullWidth

                label="Search VIN, Registration, Manufacturer..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

            <Button

                variant="contained"

                onClick={onAdd}

            >

                Add Vehicle

            </Button>

        </Box>

    );

}

export default VehicleToolbar;