import Head from 'next/head';

import { useEffect, useRef } from 'react';
import { 
  Box, 
  Flex, 
  Grid, 
  Skeleton, 
  SkeletonText, 
  Text, 
  useDisclosure 
} from "@chakra-ui/react";

import { Chart } from "../components/Charts";
import { DragCard } from "../components/DragCard";
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

import { useCards } from '../hooks/useCards';

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cardList, loadingState } = useCards();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [loadingState]);

  return (
    <Flex 
      height="100vh"
      flexDirection="column"
    >
      <Head>
        <title>Udeli | Dashboard</title>
      </Head>

      <Header openSidebar={onOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} />

      {!cardList.length && !loadingState.length && (
        <Flex 
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          marginTop={20}
        >
          <Text 
            fontSize="xl" 
            fontWeight="semibold"
            color="gray.700"
          >
            Você ainda não solicitou nenhuma análise
          </Text>
          <Text>
            Acesse o menu para solicitar as análises que deseja visualizar
          </Text>
        </Flex>
      )}

      <Grid
        as="main"
        padding={8}
        marginTop={20}
        gap={4}
        flex="1"
        autoRows="min-content"
        templateColumns={{
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)"
        }}
      >
        {cardList.map((card, index) => {
          return (
            <DragCard
              key={card.id}
              index={index}
              id={card.id}
              title={card.title}
              colSpan={(
                card.chart_type === 'line' ||
                (card.chart_type !== 'table' && card.data.length > 10)
              ) && { md: 2 }}
            >
              <Chart data={card.data} type={card.chart_type} />
            </DragCard>
          );
        })}

        {loadingState.map((isLoading, index) => isLoading && (
          <Box
            key={index}
            minHeight='500px'
            backgroundColor="white"
            textAlign="center"
            padding={4}
            border="1px"
            borderColor="gray.400"
            borderRadius="md"
          >
            <SkeletonText noOfLines={1} marginBottom={4} />
            <Skeleton height='100%' />
          </Box>
        ))}
        <div ref={ref} />
      </Grid>
    </Flex>
  );
}