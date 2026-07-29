import {
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#4CAF50", // Low
    "#2196F3", // Medium
    "#FF9800", // High
    "#F44336", // Critical
];

function SeverityChart({

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

                Severity Distribution

            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        cx="50%"

                        cy="50%"

                        outerRadius={100}

                        label

                    >

                        {data.map((entry, index) => (

                            <Cell

                                key={`cell-${index}`}

                                fill={COLORS[index % COLORS.length]}

                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </Paper>

    );

}

export default SeverityChart;