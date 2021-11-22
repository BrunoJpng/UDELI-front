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

export function BarChart({ data, label }) {
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
        <XAxis dataKey="name" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        {label === "Preferência por método de pagamento" ? (
          <>
            <Bar dataKey="value.usos" name="Usos" fill="#8884d8" />
            <Bar dataKey="value.aprovados" name="Aprovados" fill="#82ca9d" />
          </>
        ) : (
          <Bar dataKey="value" name="pedidos" fill="#8884d8" />
        )}
      </BarRechart>
    </ResponsiveContainer>
  );
}

