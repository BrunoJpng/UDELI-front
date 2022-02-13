import { Box } from '@chakra-ui/react';

import { BarChart } from './BarChart';
import { HorizontalBarChart } from './HorizontalBarChart';
import { LineChart } from './LineChart';
import { MapChart } from './MapChart';
import { PieChart } from './PieChart';
import { Table } from '../Table';


export function Chart({ data, type }) {
  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart data={data} />
      );
    }

    if (type === 'horizontalBar') {
      return (
        <HorizontalBarChart data={data} />
      );
    }

    if (type === 'map') {
      return (
        <MapChart data={data} />
      );
    }

    if (type === 'pie') {
      return (
        <PieChart data={data} />
      );
    }

    if (type === 'line') {
      return (
        <LineChart data={data} />
      );
    }

    if (type === 'table') {
      return (
        <Table 
          data={data} 
          title="Clientes reincidentes"
          headerName='Nome'
          headerValue='Nº de pedidos'
          pageSize={6}
        />
      );
    }
  }

  return (
    <Box>
      {renderChart()}
    </Box>
  );
}