import { ChangeEvent } from "react";
import {
  Checkbox, 
  Divider,
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  Stack,
} from "@chakra-ui/react";

import { useCards } from "../../hooks/useCards";

export function Sidebar({ isOpen, onClose }) {
  const { addCard } = useCards();

  const handleCheck = async (event: ChangeEvent<HTMLInputElement>, query: string) => {
    if (event.target.checked) {
      addCard(`/analysis?column=${query}`);
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Selecione as análises que deseja visualizar</DrawerHeader>

        <DrawerBody>
          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "end-entrega-estado")}>
              Pedidos por estado
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "end-entrega-estado&somenteEntregues=true")}>
              Pedidos entregues por estado
            </Checkbox>

            <Divider />
            
            <Checkbox onChange={e => handleCheck(e, "end-entrega-cidade")}>
              Pedidos por cidade
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "end-entrega-cidade&somenteEntregues=true")}>
              Pedidos entregues por cidade
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            {/* <Checkbox onChange={e => handleCheck(e, "pedido-valor-total")}>
              Faturamento por produto
            </Checkbox> */}
            <Checkbox onChange={e => handleCheck(e, "pedido-valor-total")}>
              Faturamento ao longo do tempo
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "sexo&apenasCadastrados=true")}>
              Gênero dos clientes
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "sexo")}>
              Gênero dos clientes que fizeram pedidos
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "sexo&somenteEntregues=true")}>
              Gênero dos clientes que receberam seus pedidos
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "end-entrega-nome")}>
              Taxa de reincidência
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "end-entrega-nome&clientes=true")}>
              Lista de clientes reincidentes
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "data-criacao")}>
              Cadastros ao longo do tempo
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "data-nascimento")}>
              Faixa etária
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "pedido-situacao")}>
              Taxa de cancelamento ao longo do tempo
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "pagamento-nome")}>
              Preferência por métodos de pagamento
            </Checkbox>
            <Checkbox onChange={e => handleCheck(e, "envio-nome")}>
              Preferência por meios de envio
            </Checkbox>
          </Stack>

          <Divider />

          <Stack paddingLeft={6} marginTop={1} spacing={1}>
            <Checkbox onChange={e => handleCheck(e, "produtos")}>
              Produtos mais vendidos
            </Checkbox>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}