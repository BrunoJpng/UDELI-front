import NextLink from 'next/link';

import { Flex, Button, Link, Text } from "@chakra-ui/react";
import { MdMenu, MdKeyboardBackspace } from "react-icons/md";

type HeaderProps = {
  openSidebar: () => void;
}

export function Header({ openSidebar }: HeaderProps) {
  return (
    <Flex 
      bgGradient="linear(to-r, blue.700, blue.800)"
      color="white"
      justifyContent="center"
      padding={4}
      borderBottom="1px solid"
      borderColor="blue.900"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={999}
    >
      <Flex 
        width="100%"
        maxWidth="1100px"
        alignItems="center" 
        justifyContent="space-between"
      >
        <NextLink href='/' passHref>
          <Link>
            <MdKeyboardBackspace size={24} />
          </Link>
        </NextLink>

        <Text>Dashboard</Text>

        <Button 
          rightIcon={<MdMenu size={24} />} 
          aria-label="Abrir formulário"
          variant="outline"
          marginRight={2}
          onClick={openSidebar}
        >
          Menu
        </Button>
      </Flex>
    </Flex>
  );
}