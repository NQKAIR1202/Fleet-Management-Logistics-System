import {
    Paper,
    Typography,
    Box,
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

function WorkshopCostChart({

    data = [],

}) {

    const chartData = data.map(item => ({

        Model: item.Model,

        Cost: Number(item.Cost),

    }));

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                height: 420,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >

                Maintenance Cost by Vehicle Model

            </Typography>

            <Box
                sx={{
                    width: "100%",
                    height: 320,
                }}
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}
                    >

                        <CartesianGrid
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            dataKey="Model"
                        />

                        <YAxis 
                        tickFormatter={(value) =>
                            `${(value / 1000000).toFixed(0)}M`
                        }
                        />

                        <Tooltip
                            formatter={(value) => [
                                Number(value).toLocaleString("en-US") + " VND",
                                "Cost",
                            ]}
                        />

                        <Bar
                            dataKey="Cost"
                            radius={[8, 8, 0, 0]}
                            dataKey="Cost"
                            fill="#00BCD4"
                            radius={[8,8,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </Box>

        </Paper>

    );

}

export default WorkshopCostChart;