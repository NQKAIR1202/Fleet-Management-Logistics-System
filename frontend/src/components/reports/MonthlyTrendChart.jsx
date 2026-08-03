import {
    Card,
    CardContent,
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

const data = [
    { month: "Jan", jobs: 30 },
    { month: "Feb", jobs: 28 },
    { month: "Mar", jobs: 38 },
    { month: "Apr", jobs: 32 },
    { month: "May", jobs: 43 },
    { month: "Jun", jobs: 36 },
    { month: "Jul", jobs: 48 },
    { month: "Aug", jobs: 40 },
    { month: "Sep", jobs: 35 },
    { month: "Oct", jobs: 45 },
    { month: "Nov", jobs: 39 },
    { month: "Dec", jobs: 50 },
];

function MonthlyTrendChart() {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 2,
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >

                    Monthly Maintenance Jobs

                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="jobs"
                            stroke="#1976d2"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}

export default MonthlyTrendChart;