import Head from 'next/head';
import NextLink from 'next/link';

import { useCallback, useState } from "react";
import { Grid, Link, Text, useDisclosure } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

import update from 'immutability-helper';

import { Chart } from "../components/Charts";
import { DragCard } from "../components/DragCard";
import { Header } from '../components/Header';

import { Sidebar } from '../components/Sidebar';

type Result = {
  name: string;
  value: number;
}

type Analysis = {
  title: string;
  chart: string;
  result: Result[];
}

export default function Dashboard() {
  const [data, setData] = useState<Analysis[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = data[dragIndex];
    setData(update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ],
    }));
  }, [data, setData]);

  const addCard = (cardData: Analysis) => {
    setData(state => state.concat(cardData));
  }

  const removeCard = (id: string) => {
    setData(state => state.filter(chart => chart.title !== id));
  }

  return (
    <>
      <Head>
        <title>Udeli | Dashboard</title>
      </Head>

      <Header openSidebar={onOpen} />
      <Sidebar addCard={addCard} isOpen={isOpen} onClose={onClose} />

      <NextLink href='/' passHref>
        <Link 
          width='300px' 
          display='flex'
          alignItems='center'
          paddingX={4}
          paddingY={2}
          color='blue.800'
          _hover={{ color: 'blue.700' }}
        >
          <BiArrowBack size={32} />
          <Text marginLeft={2}>Voltar para a página inicial</Text> 
        </Link>
      </NextLink>

      <Grid
        as="main"
        padding={8}
        gap={4}
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
              removeCard={removeCard}
              colSpan={(
                current.chart === 'line' ||
                (current.chart !== 'table' && current.result.length > 10)
              ) && { md: 2 }}
            >
              <Chart data={current.result} type={current.chart} />
            </DragCard>
          )
        })}
      </Grid>
    </>
  );
}