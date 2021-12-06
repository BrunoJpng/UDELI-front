import Head from 'next/head';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs'

import { FileContextProvider } from '../contexts/FilesContext';

import { FileList } from '../components/FileList';
import { Dropzone } from '../components/Form';

import { Container, Content, Button } from '../styles/pages/Home';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/resultado")
  }

  return (
    <Container>
      <Head>
        <title>Udeli | Início</title>
      </Head>

      <Content>
        <h2>Envie as planilhas que deseja analisar</h2>

        <FileContextProvider>
          <Dropzone name="spreadsheets" />
          <FileList />
        </FileContextProvider>

        <span>
          Acessar o resultado das análises
          <Button onClick={handleClick}>
            <BsArrowRight size={24} />
          </Button>
        </span>
      </Content>
    </Container>
  );
}