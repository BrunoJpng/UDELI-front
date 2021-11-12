import { 
  PieChart as PieRechart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type PieChartProps = {
  data: Array<{
    name: string;
    value: number;
  }>
}

export function PieChart({ data }: PieChartProps) {
  const colors = ['#03bb85', '#e57878', '#8884d8', '#ff8042', '#ffbb28', '#8257e5']
  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#fff"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {value}
        </text>
        <text
          x={x}
          y={y + 20}
          fill="#fff"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer minHeight={400} minWidth={300}>
      <PieRechart>
        <Pie
          data={data}
          cx={200}
          cy={200}
          dataKey="value"
          label={renderLabel}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend />
      </PieRechart>
    </ResponsiveContainer>
  );
}