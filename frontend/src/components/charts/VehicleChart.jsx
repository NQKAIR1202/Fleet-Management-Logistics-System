import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2E7D32",
  "#1565C0",
  "#ED6C02",
  "#D32F2F",
];

function VehicleChart({ data = [] }) {
  const chartData = data.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={110}
          paddingAngle={3}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend
          verticalAlign="bottom"
          height={36}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default VehicleChart;