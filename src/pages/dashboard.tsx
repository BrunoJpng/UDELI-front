import { GetServerSideProps } from "next";
import Head from 'next/head';
import { useCallback, useState } from "react";
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

import { api } from "../services/api";

type Analysis = {
  title: string;
  chart: string;
  result: object;
};

type DashboardProps = {
  data: Analysis[];
}

type IFormattedData = Array<{
  name: string;
  value: number;
}>

export default function Dashboard({ data }: DashboardProps) {
  const [charts, setCharts] = useState(data);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = charts[dragIndex];
    setCharts(update(charts, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ],
    }));
  }, [charts]);

  const removeChart = (id: string) => {
    setCharts(state => state.filter(chart => chart.title !== id));
  }

  return (
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
      <Head>
        <title>Udeli | Dashboard</title>
      </Head>
      
      {charts.map((current, index) => {
        const formattedData: IFormattedData = Object.entries(current.result).map(entry => {
          const [name, value] = entry;
          return { name, value }
        });

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
                <MapChart data={formattedData} />
                <Table data={formattedData} />
              </Flex>
            )}
            {current.chart === 'bar' && <BarChart data={formattedData} />}
            {current.chart === 'horizontalBar' && <BarChart data={formattedData} layout="vertical" />}
            {current.chart === 'pie' && <PieChart data={formattedData} />}
            {current.chart === 'line' && <LineChart data={formattedData} label={current.title} />}
          </DragCard>
        )
      })}
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await api.get('/data', { 
    // headers: {
    //   Cookie: req.headers.cookie
    // },
    // data: {
    //   query: [
    //     "state", 
    //     "city",
    //     "repeatCostumers",
    //     "gender",
    //     "ageGroup",
    //     "registrationByPeriod",
    //     "incomesByPeriod",
    //     "cancellationsByPeriod",
    //     "paymentMethodPreference",
    //     "sendingMethodPreference"
    //   ]
    // }
  });

  return {
    props: {
      data
    }
  }
}