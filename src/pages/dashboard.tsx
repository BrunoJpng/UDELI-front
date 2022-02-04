import Head from 'next/head';
import { useCallback, useState } from "react";
import { Box, Flex, Grid, useBreakpointValue } from "@chakra-ui/react";

import update from 'immutability-helper';

import { 
  BarChart, 
  LineChart, 
  PieChart, 
  MapChart 
} from "../components/Charts";
import { DragCard } from "../components/DragCard";
import { Table } from "../components/Table";
import { Sidebar } from "../components/Sidebar";

import { useData } from "../hooks/useData";
import { Header } from '../components/Header';

type Analysis = {
  title: string;
  chart: string;
  result: object;
};

type Variant = {
  navigation: 'drawer' | 'sidebar';
  navigationButton: boolean;
}

const smVariant: Variant = { navigation: 'drawer', navigationButton: true }
const lgVariant: Variant = { navigation: 'sidebar', navigationButton: false }

export default function Dashboard() {
  const { data, setData } = useData();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, lg: lgVariant });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
      
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />

      <Box marginLeft={!variants?.navigationButton && 400}>
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />

        <Grid
          as="main"
          padding={8}
          gap={4}
          backgroundColor="gray.100"
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
                colSpan={(current.chart === 'map' || current.chart === 'line') && { md: 2 }}
              >
                {current.chart === 'map' && (
                  <Flex 
                    flexDirection={{ sm: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MapChart data={current.result} />
                    <Table 
                      data={current.result}
                      title={current.title}
                      headerName='Estado'
                      headerValue='Nº de pedidos'
                      pageSize={5}
                    />
                  </Flex>
                )}
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
                    pageSize={10}
                  />
                )}
              </DragCard>
            )
          })}
        </Grid>
      </Box>
    </>
  );
}