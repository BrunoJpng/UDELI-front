import Head from 'next/head';
import { useCallback } from "react";
import { Flex, Grid } from "@chakra-ui/react";

import update from 'immutability-helper';

import { 
  BarChart, 
  LineChart, 
  PieChart, 
  MapChart 
} from "../components/Charts";
import { DragCard } from "../components/DragCard";
import { Table } from "../components/Table";

import { useData } from "../hooks/useData";
import { Header } from '../components/Header';

export default function Dashboard() {
  const { data, setData } = useData();

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = data[dragIndex];
    setData(update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ],
    }));
  }, [data]);

  const removeChart = (id: string) => {
    setData(state => state.filter(chart => chart.title !== id));
  }

  return (
    <>
      <Head>
        <title>Udeli | Dashboard</title>
      </Head>

      <Flex
       minHeight="100vh"
       flexDirection="column"
      >
        <Header />

        <Grid
          as="main"
          padding={8}
          gap={4}
          backgroundColor="gray.100"
          flex="1"
          autoRows="min-content"
          templateColumns={{
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)"
          }}
        >
          {data?.map((current, index) => {
            return (
              <DragCard
                key={current.title}
                index={index}
                id={current.title}
                moveCard={moveCard}
                removeChart={removeChart}
                colSpan={(
                  current.chart === 'line' ||
                  (current.chart !== 'table' && current.result.length > 10)
                ) && { md: 2 }}
              >
                {current.chart === 'map' && <MapChart data={current.result} />}
                {current.chart === 'bar' && <BarChart data={current.result} />}
                {current.chart === 'horizontalBar' && <BarChart data={current.result} layout="vertical" />}
                {current.chart === 'pie' && <PieChart data={current.result} />}
                {current.chart === 'line' && <LineChart data={current.result} label={current.title} />}
                {current.chart === 'table' && (
                  <Table 
                    data={current.result} 
                    title={current.title}
                    headerName='Nome'
                    headerValue='Nº de pedidos'
                    pageSize={6}
                  />
                )}
              </DragCard>
            )
          })}
        </Grid>
      </Flex>
    </>
  );
}