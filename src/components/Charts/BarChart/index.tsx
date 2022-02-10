import { Box } from '@chakra-ui/react';
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
    value: number | object;
  }>;
  layout?: "vertical" | "horizontal"
}

export function BarChart({ data, layout = "horizontal" }: BarChartProps) {
  return (
    <Box width="100%" overflowY="hidden">
      <ResponsiveContainer 
        height={550} 
        minWidth={layout === 'horizontal' && data.length * 60}
      >
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
              <XAxis dataKey="name" interval={0} />
              <YAxis />
            </>
          )}
          <Bar dataKey="value" name="pedidos" fill="#8884d8" />
        </BarRechart>
      </ResponsiveContainer>
    </Box>
  );
}

