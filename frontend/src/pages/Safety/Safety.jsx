
import { useEffect, useMemo, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";

import SafetyToolbar from "../../components/safety/SafetyToolbar";
import IncidentTable from "../../components/safety/IncidentTable";
import TrendChart from "../../components/safety/TrendChart";
import SeverityChart from "../../components/safety/SeverityChart";
import IncidentDialog from "../../components/safety/IncidentDialog";

import { getSafetyEvents } from "../../services/safetyService";

function Safety() {

    // ==========================================================
    // DATA
    // ==========================================================

    const [incidents, setIncidents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedIncident, setSelectedIncident] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    // ==========================================================
    // FILTERS
    // ==========================================================

    const [search, setSearch] = useState("");

    const [severityFilter, setSeverityFilter] = useState("All");

    const [eventTypeFilter, setEventTypeFilter] = useState("All");

    const [statusFilter, setStatusFilter] = useState("All");

    // ==========================================================
    // LOAD DATA
    // ==========================================================

    useEffect(() => {

        async function loadSafety() {

            try {

                const data = await getSafetyEvents();

                console.log("Safety Events:", data);

                const mapped = data.map(item => ({

                    incidentID: item.EventID,

                    date: item.EventTimestamp,

                    vin: item.VIN,

                    driver: item.Driver,

                    eventType: item.EventType,

                    severity: item.Severity,

                    status: item.Status,

                    description: ""

                }));

                setIncidents(mapped);

            }
            catch (err) {

                console.error(err);

            }
            finally {

                setLoading(false);

            }

        }

        loadSafety();

    }, []);

    // ==========================================================
    // FILTERED DATA
    // ==========================================================

    const filteredIncidents = useMemo(() => {

        return incidents.filter((item) => {

            const keyword = search.toLowerCase();

            const matchSearch =

                item.incidentID.toString().includes(keyword)

                ||

                item.vin.toLowerCase().includes(keyword)

                ||

                item.driver.toLowerCase().includes(keyword);

            const matchSeverity =

                severityFilter === "All"

                ||

                item.severity === severityFilter;

            const matchEvent =

                eventTypeFilter === "All"

                ||

                item.eventType === eventTypeFilter;

            const matchStatus =

                statusFilter === "All"

                ||

                item.status === statusFilter;

            return (

                matchSearch

                &&

                matchSeverity

                &&

                matchEvent

                &&

                matchStatus

            );

        });

    }, [

        incidents,

        search,

        severityFilter,

        eventTypeFilter,

        statusFilter

    ]);

    // ==========================================================
    // TREND CHART
    // ==========================================================

    const trendData = useMemo(() => {

        const trend = {};

        filteredIncidents.forEach(item => {

            const month = item.date.substring(0,7);

            trend[month] = (trend[month] || 0) + 1;

        });

        return Object.keys(trend).map(month => ({

            month,

            incidents: trend[month]

        }));

    }, [filteredIncidents]);

    // ==========================================================
    // SEVERITY CHART
    // ==========================================================

    const severityData = useMemo(() => {

        const counts = {};

        filteredIncidents.forEach(item => {

            counts[item.severity] =

                (counts[item.severity] || 0) + 1;

        });

        return Object.keys(counts).map(name => ({

            name,

            value: counts[name]

        }));

    }, [filteredIncidents]);

    // ==========================================================
    // EVENTS
    // ==========================================================

    function handleView(incident) {

        setSelectedIncident(incident);

        setDialogOpen(true);

    }

    function handleReset() {

        setSearch("");

        setSeverityFilter("All");

        setEventTypeFilter("All");

        setStatusFilter("All");

    }

    function handleExport() {

        const csv = [

            [

                "IncidentID",

                "Date",

                "VIN",

                "Driver",

                "EventType",

                "Severity",

                "Status"

            ],

            ...filteredIncidents.map(i => [

                i.incidentID,

                i.date,

                i.vin,

                i.driver,

                i.eventType,

                i.severity,

                i.status

            ])

        ]

            .map(e => e.join(","))

            .join("\n");

        const blob = new Blob([csv], {

            type: "text/csv"

        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "SafetyEvents.csv";

        a.click();

    }

    // ==========================================================


    return (

        <Stack spacing={4}>

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

            <SafetyToolbar

                search={search}

                setSearch={setSearch}

                severityFilter={severityFilter}

                setSeverityFilter={setSeverityFilter}

                eventTypeFilter={eventTypeFilter}

                setEventTypeFilter={setEventTypeFilter}

                statusFilter={statusFilter}

                setStatusFilter={setStatusFilter}

                onReset={handleReset}

                onExport={handleExport}

            />

            <IncidentTable

                incidents={filteredIncidents}

                onView={handleView}

                loading={loading}

            />

            <Stack

                direction={{

                    xs: "column",

                    lg: "row"

                }}

                spacing={3}

            >

                <TrendChart

                    data={trendData}

                />

                <SeverityChart

                    data={severityData}

                />

            </Stack>

            <IncidentDialog

                open={dialogOpen}

                incident={selectedIncident}

                onClose={() => setDialogOpen(false)}

            />

        </Stack>

    );

}

export default Safety;