import { 
  LineChart as LineRechart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function LineChart({ data, label }) {
  const tickFormatter = (tick: string) => {
    if (tick.split('-').length === 1) {
      return tick;
    }

    else if (tick.split('-').length === 3) {
      return '';
    }
    
    const date = format(new Date(tick + ' 03:00'), 'MMM', {
      locale: ptBR,
    });
    return date;
  }

  const renderTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value } = payload;

    if (value.split('-').length !== 2) {
      return null
    }

    const date = new Date(value);
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month === 5) {
      return <text x={x} y={y-4} textAnchor="middle">{year}</text>;
    }

    if (month === 11) {
      return <path d={`M${x},${y - 4}v${-35}`} stroke="red" />;
    }

    return null;
  }

  const CustomTooltip = (tooltipProps) => {
    const { active, payload, label } = tooltipProps;
    
    if (active && payload && payload.length) {
      const date = format(new Date(label + ' 03:00'), "'Em' MMMM 'de' yyyy", {
        locale: ptBR,
      });

      return (
        <div className="custom-tooltip">
          <p>{date}</p>
          {payload[0].value === 0 ? (
            <p>Nenhum pedido foi cancelado</p>
          ) : (
            <p>{payload[0].value} pedidos foram cancelados</p>
          )}
        </div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer height={500} width="100%">
      <LineRechart data={data} margin={{ bottom: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={tickFormatter} interval={0} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={renderTick}
          height={1}
          xAxisId="quarter"
        />
        <YAxis />
        <Tooltip />
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