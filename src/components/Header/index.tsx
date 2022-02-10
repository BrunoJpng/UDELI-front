import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Sidebar } from "../Sidebar";

export function Header() {
  return (
    <Flex 
      background="blue.800"
      color="white"
      justifyContent="center"
      padding={4}
    >
      <Box flex="1">
        <Sidebar />
      </Box>
      <Center flex="1" height="40px">
        <Text>Dashboard</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
}