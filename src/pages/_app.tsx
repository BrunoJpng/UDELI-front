import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
        <CSSReset />
      </DndProvider>
    </ChakraProvider>
  );
}

export default MyApp
