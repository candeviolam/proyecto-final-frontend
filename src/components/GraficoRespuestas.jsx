import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lun", respuestas: 5 },
  { name: "Mar", respuestas: 12 },
  { name: "Mié", respuestas: 9 },
  { name: "Jue", respuestas: 14 },
  { name: "Vie", respuestas: 7 },
];

export default function GraficoRespuestas() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="respuestas"
          stroke="var(--color-primary"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
