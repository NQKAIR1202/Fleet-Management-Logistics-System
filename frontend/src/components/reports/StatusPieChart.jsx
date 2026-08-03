import {
    Paper,
    Typography,
    Box,
} from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#F44336",
    "#9C27B0",
    "#00BCD4",
];

function StatusPieChart({

    data = [],

}) {

    const chartData = data.map(item => ({

        name: item.Status,

        value: item.Count,

    }));

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                height: 620,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >

                Maintenance Job Status

            </Typography>

            <Box
                sx={{
                    width: "100%",
                    height: "90%",
                }}
            >

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={85}
                            outerRadius={185}
                            paddingAngle={3}
                            label={({ percent }) =>
                                `${(percent * 100).toFixed(0)}%`
                            }
                        >

                            {

                                chartData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </Box>

        </Paper>

    );

}

export default StatusPieChart;