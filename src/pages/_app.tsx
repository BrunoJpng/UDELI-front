import { AppProps } from 'next/app'

import { FileContextProvider } from '../contexts/FilesContext';

import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FileContextProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </FileContextProvider>
  );
}
export default MyApp
