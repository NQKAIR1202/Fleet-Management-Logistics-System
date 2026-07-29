import { Stack, Box, Typography } from "@mui/material";

import SafetyToolbar from "../../components/safety/SafetyToolbar";
import IncidentTable from "../../components/safety/IncidentTable";
import TrendChart from "../../components/safety/TrendChart";
import SeverityChart from "../../components/safety/SeverityChart";
import IncidentDialog from "../../components/safety/IncidentDialog";

function Safety() {

    return (

        <Stack spacing={4}>

            {/* Page Header */}

            <Box>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    gutterBottom
                >
                    Safety
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Manage fleet safety events and investigations.
                </Typography>

            </Box>

            {/* Toolbar */}

            <SafetyToolbar />

            {/* Incident Table */}

            <IncidentTable />

            {/* Charts */}

            <Stack
                direction={{
                    xs: "column",
                    lg: "row",
                }}
                spacing={3}
            >

                <TrendChart />

                <SeverityChart />

            </Stack>

            {/* Incident Details Dialog */}

            <IncidentDialog />

        </Stack>

    );

}

export default Safety;