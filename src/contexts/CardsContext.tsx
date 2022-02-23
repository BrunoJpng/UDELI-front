import { createContext, useState, useCallback, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";

import update from 'immutability-helper';

import { api } from "../services/api";

type Card = {
  id: string;
  title: string;
  chart_type: string;
  data: any;
}

type CardContextData = {
  cardList: Card[];
  loadingState: boolean[];
  moveCard: (dragIndex: number, hoverIndex: number) => void
  addCard: (url: string) => void
  removeCard: (id: string) => void
}

type CardProviderProps = {
  children: ReactNode;
}

export const CardsContext = createContext({} as CardContextData);

export function CardsProvider({ children }: CardProviderProps) {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [loadingState, setLoadingState] = useState<boolean[]>([]);

  const toast = useToast();

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = cardList[dragIndex];
    setCardList(update(cardList, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ],
    }));
  }, [cardList, setCardList]);

  const addCard = useCallback((url: string) => {
    setLoadingState(state => state.concat(true));

    api.get<Card>(url).then(response => {
      setCardList(state => state.concat(response.data));
    }).catch(err => {
      toast({
        title: 'Erro',
        description: err.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }).finally(() => {
      setLoadingState(state => state.slice(1));
    });
  }, [toast]);

  const removeCard = useCallback((id: string) => {
    setCardList(state => state.filter(chart => chart.id !== id));
  }, []);

  return (
    <CardsContext.Provider value={{
      cardList,
      loadingState,
      moveCard,
      addCard,
      removeCard,
    }}>
      {children}
    </CardsContext.Provider>
  )
}
