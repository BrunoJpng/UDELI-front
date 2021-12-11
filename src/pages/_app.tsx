import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <CSSReset />
    </ChakraProvider>
  );
}

export default MyApp
