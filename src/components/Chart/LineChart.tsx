import { 
  LineChart as LineRechart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function LineChart({ data, label }) {
  const tickFormatter = (tick: string) => {
    const date = format(new Date(tick + ' 03:00'), 'MMM', {
      locale: ptBR,
    });
    return date;
  }

  const renderTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value } = payload;

    const date = new Date(value);
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month === 5) {
      return <text x={x} y={y-4} textAnchor="middle">{year}</text>;
    }

    if (month === 11) {
      return <path d={`M${x-6},${y - 4}v${-35}`} stroke="red" />;
    }

    return null;
  }

  return (
    <ResponsiveContainer minHeight={400} minWidth={800}>
      <LineRechart data={data} margin={{ bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={tickFormatter} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={renderTick}
          height={1}
          scale="band"
          xAxisId="quarter"
        />
        <YAxis />
        <Tooltip />
        {/* <Legend verticalAlign="top" /> */}
        <Line
          type="monotone"
          dataKey="value"
          name={label}
          stroke="#8884d8"
        />
      </LineRechart>
    </ResponsiveContainer>
  );
}