import Head from 'next/head';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Text
} from '@chakra-ui/react';

import { FileContextProvider } from '../contexts/FilesContext';

import { FileList } from '../components/FileList';
import { Dropzone } from '../components/Form';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard")
  }

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.100"
    >
      <Head>
        <title>Udeli | Início</title>
      </Head>

      <Box
        width="90%"
        maxWidth="800px"
        backgroundColor="white"
        padding="20px"
        borderRadius="sm"
      >
        <Heading marginBottom={2}>
          Envie as planilhas que deseja analisar
        </Heading>

        <FileContextProvider>
          <Dropzone name="spreadsheets" />
          <FileList />
        </FileContextProvider>

        <Flex
          alignItems="center"
          justifyContent="center"
          gridGap={4}
        >
          <Text>
            Acessar o resultado das análises
          </Text>
          <Button
            backgroundColor="#04D361"
            _hover={{ backgroundColor: "#04bf58" }}
            textColor="white"
            onClick={handleClick}
          >
            <BsArrowRight size={24} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}