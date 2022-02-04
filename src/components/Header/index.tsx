import { Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

type HeaderProps = {
  showSidebarButton?: boolean;
  onShowSidebar: () => void;
}

export function Header({ showSidebarButton = true, onShowSidebar}: HeaderProps) {
  return (
    <Flex 
      background="blue.800"
      color="white"
      justifyContent="center"
      padding={4}
    >
      <Box flex="1">
        {showSidebarButton && (
          <IconButton 
            icon={<MdMenu size={24} />} 
            aria-label=""
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex="1" height="40px">
        <Text>Dashboard</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
}