import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

export function useData() {
  const value = useContext(DataContext);

  return value;
}