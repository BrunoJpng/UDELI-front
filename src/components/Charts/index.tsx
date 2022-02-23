import { Box } from '@chakra-ui/react';

import { BarChart } from './BarChart';
import { HorizontalBarChart } from './HorizontalBarChart';
import { LineChart } from './LineChart';
import { MapChart } from './MapChart';
import { PieChart } from './PieChart';
import { Table } from '../Table';


export function Chart({ data, type }) {
  const plotData = Object.entries<number>(data).map(entry => ({
    name: entry[0],
    value: entry[1]
  }));

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart data={plotData} />
      );
    }

    if (type === 'horizontalBar') {
      return (
        <HorizontalBarChart data={plotData} />
      );
    }

    if (type === 'map') {
      return (
        <MapChart data={plotData} />
      );
    }

    if (type === 'pie') {
      return (
        <PieChart data={plotData} />
      );
    }

    if (type === 'line') {
      return (
        <LineChart data={plotData} />
      );
    }

    if (type === 'table') {
      return (
        <Table 
          data={plotData} 
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