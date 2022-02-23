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

type Data = {
  name: string;
  value: number;
}

type HorizontalBarChartProps = {
  data: Data[];
}

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  return (
    <Box width="100%" overflowY="hidden">
      <ResponsiveContainer height={550}>
        <BarRechart 
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 10,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Bar dataKey="value" name="pedidos" fill="#8884d8" />
        </BarRechart>
      </ResponsiveContainer>
    </Box>
  );
}

