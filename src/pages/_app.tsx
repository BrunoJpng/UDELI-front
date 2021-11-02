import { AppProps } from 'next/app'
import { DataContextProvider } from '../contexts/DataContext';

import { FileContextProvider } from '../contexts/FilesContext';

import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FileContextProvider>
      <DataContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </DataContextProvider>
    </FileContextProvider>
  );
}

export default MyApp
