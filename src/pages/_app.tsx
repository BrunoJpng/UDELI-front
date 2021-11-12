import { AppProps } from 'next/app'
import { DataContextProvider } from '../contexts/DataContext';

import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataContextProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </DataContextProvider>
  );
}

export default MyApp
