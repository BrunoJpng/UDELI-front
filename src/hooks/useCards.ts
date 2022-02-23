import { useContext } from 'react';
import { CardsContext } from '../contexts/CardsContext';

export function useCards() {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error("useCards must be used within CardsProvider")
  }
  
  return context;
}