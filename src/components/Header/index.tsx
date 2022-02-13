import { Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

export function Header({ openSidebar }) {

  return (
    <Flex 
      background="blue.800"
      color="white"
      justifyContent="center"
      padding={4}
    >
      <Flex
        flex="1"
        alignItems="center"
      >
        <IconButton 
          icon={<MdMenu size={24} />} 
          aria-label=""
          variant="outline"
          marginRight={2}
          onClick={openSidebar}
        />
        <Text>Acessar formulário</Text>
      </Flex>
      <Center flex="1" height="40px">
        <Text>Dashboard</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
}