import { 
  BarChart as BarRechart, 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';

export function BarChart({ data }) {
  return (
    <ResponsiveContainer minHeight={400} minWidth={800}>
      <BarRechart 
        data={data} 
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
        <Bar dataKey="value" name="Número de pedidos" fill="#8884d8" />
      </BarRechart>
    </ResponsiveContainer>
  );
}

