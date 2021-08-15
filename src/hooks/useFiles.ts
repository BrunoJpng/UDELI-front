import { useContext } from 'react';
import { FileContext } from '../contexts/FilesContext';

export function useFiles() {
  const value = useContext(FileContext);
  
  return value;
}