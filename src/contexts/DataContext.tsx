import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type DataContextData = {
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
}

type DataContextProviderProps = {
  children: ReactNode;
}

export const DataContext = createContext({} as DataContextData);

export function DataContextProvider({children}: DataContextProviderProps) {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}