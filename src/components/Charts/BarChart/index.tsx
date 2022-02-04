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

type BarChartProps = {
  data: Array<{
    name: string;
    value: unknown;
  }>;
  layout?: "vertical" | "horizontal"
}

export function BarChart({ data, layout = "horizontal" }: BarChartProps) {
  return (
    <ResponsiveContainer height={500} width="100%">
      <BarRechart 
        data={data}
        layout={layout}
        margin={{
          top: 5,
          right: 10,
          left: layout === "horizontal" ? 0 : 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {layout === "vertical" ? (
          <>
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
          </>
        ) : (
          <>
            <XAxis dataKey="name" />
            <YAxis />
          </>
        )}
        {/* {label === "Preferência por método de pagamento" ? (
          <>
            <Bar dataKey="value.usos" name="Usos" fill="#8884d8" />
            <Bar dataKey="value.aprovados" name="Aprovados" fill="#82ca9d" />
          </>
        ) : ( */}
          <Bar dataKey="value" name="pedidos" fill="#8884d8" />
         {/* )} */}
      </BarRechart>
    </ResponsiveContainer>
  );
}

