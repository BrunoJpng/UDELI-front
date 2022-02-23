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

type BarChartProps = {
  data: Data[];
}

export function BarChart({ data }: BarChartProps) {
  return (
    <Box width="100%" overflowY="hidden">
      <ResponsiveContainer height={550} minWidth={data.length * 60}>
        <BarRechart 
          data={data}
          margin={{
            top: 5,
            right: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <XAxis dataKey="name" interval={0} />
          <YAxis />
          <Bar dataKey="value" name="pedidos" fill="#8884d8" />
        </BarRechart>
      </ResponsiveContainer>
    </Box>
  );
}