import { GetServerSideProps } from "next";
import Head from 'next/head';
import { Flex, Grid, GridItem } from "@chakra-ui/react";

import { 
  BarChart, 
  LineChart, 
  PieChart, 
  MapChart 
} from "../components/Charts";
import { Table } from "../components/Table";

import { api } from "../services/api";

type IAnalysis = {
  title: string;
  chart: string;
  result: object;
};

type IAnalysisList = {
  analysis: Array<IAnalysis>;
}

type IFormattedData = Array<{
  name: string;
  value: number;
}>

export default function Resultado({ analysis }: IAnalysisList) {
  return (
    <Grid
      as="main"
      // height="100%"
      // width="100vw"
      padding={8}
      gap={4}
      backgroundColor="gray.100"
      templateColumns={{
        md: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)"
      }}
    >
      <Head>
        <title>Udeli | Resultado</title>
      </Head>
      
      {analysis.map(current => {
        const formattedData: IFormattedData = Object.entries(current.result).map(entry => {
          const [name, value] = entry;
          return { name, value }
        });

        return (
          <GridItem
            key={current.title}
            backgroundColor="white"
            textAlign="center"
            padding={4}
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
            overflowY="hidden"
            colSpan={(current.chart === 'map' || current.chart === 'line') && { md: 2 }}
          >
            {current.title}
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
          </GridItem>
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
  })

  return {
    props: {
      analysis: data
    }
  }
}