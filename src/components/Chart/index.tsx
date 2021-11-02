import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container } from './styles';

type RechartProps = {
  data: Object;
  label: string;
}

export function Chart({ data, label }: RechartProps) {
  const dataFormatted = Object.entries(data).map(entry => {
    const [name, value] = entry;

    return {
      name,
      value,
    }
  });

  return (
    <Container>
      {/* <h3>{label}</h3> */}
      <ResponsiveContainer width="90%" height={300} minWidth={900}>
        <BarChart 
          data={dataFormatted} 
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name={label} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}