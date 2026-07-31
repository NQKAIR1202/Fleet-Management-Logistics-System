import {
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function TrendChart({

    data = [],

}) {

    return (

        <Paper

            elevation={0}

            sx={{

                flex: 1,

                p: 3,

                borderRadius: 2,

                boxShadow: 2,

                border: "1px solid",

                borderColor: "divider",

                height: 380,

            }}

        >

            <Typography

                variant="h6"

                fontWeight={600}

                gutterBottom

            >

                Incident Trend

            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis
                        allowDecimals={false}
                    />

                    <Tooltip />

                    <Line

                        type="monotone"

                        dataKey="incidents"

                        stroke="#1976d2"

                        strokeWidth={3}

                        dot={{
                            r: 5,
                        }}

                        activeDot={{
                            r: 7,
                        }}

                    />

                </LineChart>

            </ResponsiveContainer>

        </Paper>

    );

}

export default TrendChart;