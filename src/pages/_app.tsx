import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { FileProvider } from '../contexts/FilesContext';
import { CardsProvider } from '../contexts/CardsContext';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CardsProvider>
        <FileProvider>
          <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
            <CSSReset />
          </DndProvider>
        </FileProvider>
      </CardsProvider>
    </ChakraProvider>
  );
}

export default MyApp
