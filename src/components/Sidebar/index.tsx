import { ChangeEvent, useState } from "react";
import { 
  Box,
  Button,
  Checkbox, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  Stack, 
} from "@chakra-ui/react";

import { useData } from "../../hooks/useData";

import { api } from "../../services/api";

type SidebarProps = {
  isOpen: boolean;
  variant: 'drawer' | 'sidebar';
  onClose: () => void;
}

function SidebarContent({ handleCheck }) {
  return (
    <>
      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        <Checkbox onChange={e => handleCheck(e, "end-entrega-estado")}>
          Pedidos por estado
        </Checkbox>
        <Checkbox onChange={e => handleCheck(e, "end-entrega-estado&somenteEntregues=true")}>
          Pedidos entregues por estado
        </Checkbox>
        <Checkbox onChange={e => handleCheck(e, "end-entrega-cidade")}>
          Pedidos por cidade
        </Checkbox>
        <Checkbox onChange={e => handleCheck(e, "end-entrega-cidade&somenteEntregues=true")}>
          Pedidos entregues por cidade
        </Checkbox>
      </Stack>

      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        {/* <Checkbox onChange={e => handleCheck(e, "pedido-valor-total")}>
          Faturamento por produto
        </Checkbox> */}
        <Checkbox onChange={e => handleCheck(e, "pedido-valor-total")}>
          Faturamento ao longo do tempo
        </Checkbox>
      </Stack>

      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        <Checkbox onChange={e => handleCheck(e, "sexo&apenasCadastrados=true")}>
          Gênero dos clientes
        </Checkbox>
        {/* <Checkbox onChange={e => handleCheck(e, "sexo")}>
          Gênero dos clientes que fizeram pedidos
        </Checkbox> */}
        {/* <Checkbox onChange={e => handleCheck(e, "sexo&somenteEntregues=true")}>
          Gênero dos clientes que receberam seus pedidos
        </Checkbox> */}
      </Stack>

      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        <Checkbox onChange={e => handleCheck(e, "end-entrega-nome")}>
          Taxa de reincidência
        </Checkbox>
        <Checkbox onChange={e => handleCheck(e, "end-entrega-nome&clientes=true")}>
          Lista de clientes reincidentes
        </Checkbox>
      </Stack>

      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        <Checkbox onChange={e => handleCheck(e, "data-criacao")}>
          Cadastros ao longo do tempo
        </Checkbox>
        <Checkbox onChange={e => handleCheck(e, "data-nascimento")}>
          Faixa etária
        </Checkbox>
      </Stack>

      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        <Checkbox onChange={e => handleCheck(e, "pedido-situacao")}>
          Taxa de cancelamento ao longo do tempo
        </Checkbox>
      </Stack>

      <Stack paddingLeft={6} marginTop={1} spacing={1}>
        <Checkbox onChange={e => handleCheck(e, "pagamento-nome")}>
          Preferência por métodos de pagamento
        </Checkbox>
        <Checkbox onChange={e => handleCheck(e, "envio-nome")}>
          Preferência por meios de envio
        </Checkbox>
      </Stack>
    </>
  );
}

export function Sidebar({ isOpen, variant, onClose }: SidebarProps) {
  const { setData } = useData();

  const handleCheck = (event: ChangeEvent<HTMLInputElement>, query: string) => {
    if (event.target.checked) {
      api.get(`/analysis?column=${query}`)
        .then((response) => {
          setData(state => state.concat(response.data));
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }

  return variant === 'sidebar' 
    ? (
      <Box
        as="aside"
        position="fixed"
        left={0}
        top={0}
        height="100%"
        width="400px"
        paddingY={2}
        paddingX={6}
        background="white"
      >
        <SidebarContent handleCheck={handleCheck} />
      </Box>
    ) : (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Selecione as análises que deseja visualizar</DrawerHeader>

          <DrawerBody>
            <SidebarContent handleCheck={handleCheck} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
}