import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { theme } from '../styles/theme';
import { DataContextProvider } from '../contexts/DataContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DataContextProvider>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
          <CSSReset />
        </DndProvider>
      </DataContextProvider>
    </ChakraProvider>
  );
}

export default MyApp
