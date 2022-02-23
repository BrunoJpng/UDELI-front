import Head from 'next/head';
import NextLink from 'next/link';

import { BsArrowRight } from 'react-icons/bs';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Link, 
  Text
} from '@chakra-ui/react';

import { FileProvider } from '../contexts/FilesContext';

import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';

export default function Home() {
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Udeli | Início</title>
      </Head>

      <Box
        width="90%"
        maxWidth="800px"
        background="white"
        padding={5}
        borderRadius="sm"
      >
        <Heading marginBottom={4}>
          Envie as planilhas que deseja analisar
        </Heading>

        <Text>Você pode enviar as planilhas de pedidos, clientes e produtos geradas pela Loja Integrada</Text>

        <FileProvider>
          <Dropzone />
          <FileList />
        </FileProvider>

        <NextLink href='/dashboard' passHref>
          <Link color='green.400'>
            <Text textAlign='center'>Acesse o resultado das análises aqui</Text>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
}