import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';

import { FileContextProvider } from '../contexts/FilesContext';

import { FileList } from '../components/FileList';
import { Checkbox, Datepicker, Dropzone, Select } from '../components/Form';

import { useData } from '../hooks/useData';

import { api } from '../services/api';

import { Button, Container, PeriodContainer } from '../styles/pages/Home';

export default function Home() {  
  const [incomesPeriod, setIncomesPeriod] = useState(false);
  const [identificationPeriod, setIdentificationPeriod] = useState(false);
  const [cancellationPeriod, setCancellationPeriod] = useState(false);

  const router = useRouter();
  const formRef = useRef(null);
  const { setData } = useData();

  const handleSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === 'spreadsheets') {
        data[key].forEach(spreadsheet => formData.append(key, spreadsheet.file));
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    api.post("/upload", formData)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        router.push('/resultado');
      })
      .catch(err => {
        alert(err.message);
      })
  }

  return (
    <Container>
      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Quantidade de Pedidos por</legend>

            <Scope path="address">
              <Checkbox name="city" label="Cidade" />
              <Checkbox name="state" label="Estado" />
            </Scope>
          </fieldset>

          <fieldset>
            <legend>Faturamento</legend>

            <Scope path="incomes">
              <Checkbox name="product" label="Por Produto" />
              <Checkbox name="period" label="Por Período" onClick={() => setIncomesPeriod(!incomesPeriod)} />

              {incomesPeriod && (
                <PeriodContainer>
                  <Datepicker name="date" label="Período" />
                  <Select
                    name="frequency"
                    label="Visualizar por:"
                    options={[
                      { value: "Dias", label: "Dia" },
                      { value: "Meses", label: "Mês" },
                      { value: "Anos", label: "Ano" },
                    ]}
                  />
                </PeriodContainer>
              )}
            </Scope>
          </fieldset>

          <fieldset>
            <legend>Gênero dos Clientes</legend>

            <Scope path="gender">
              <Checkbox name="all" label="Todos Cadastrados" />
              <Checkbox name="withOrders" label="Que fizeram pedido(s)" />
              <Checkbox name="withOrdersDelivered" label="Com pedido(s) entregue(s)" />
            </Scope>

          </fieldset>

          <fieldset>
            <legend>Reincidência de Compra</legend>

            <Scope path="repeatCostumers">
              <Checkbox name="list" label="Lista de clientes reincidentes" />
              <Checkbox name="percentage" label="Porcentagem de clientes reincidentes" />
            </Scope>
          </fieldset>

          <fieldset>
            <legend>Identificação de</legend>

            <Scope path="identification">
              <Checkbox name="ageGroup" label="Faixa Etária" />
              <Checkbox
                name="periodsWithMoreRegistrations"
                label="Períodos com mais cadastros"
                onClick={() => setIdentificationPeriod(!identificationPeriod)}
              />
              
              {identificationPeriod && (
                <PeriodContainer>
                  <Datepicker name="date" label="Período" />
                  <Select
                    name="frequency"
                    label="Visualizar por:"
                    options={[
                      { value: "Dias", label: "Dia" },
                      { value: "Meses", label: "Mês" },
                      { value: "Anos", label: "Ano" },
                    ]}
                  />
                </PeriodContainer>
              )}
            </Scope>
          </fieldset>

          <fieldset>
            <legend>Taxa de Cancelamento dos Pedidos</legend>

            <Scope path="cancellation">
              <Checkbox
                name="period"
                label="Por Período"
                onClick={() => setCancellationPeriod(!cancellationPeriod)}
              />

              {cancellationPeriod && (
                <PeriodContainer>
                  <Datepicker name="date" label="Período" />
                  <Select
                    name="frequency"
                    label="Visualizar por:"
                    options={[
                      { value: "Dias", label: "Dia" },
                      { value: "Meses", label: "Mês" },
                      { value: "Anos", label: "Ano" },
                    ]}
                  />
                </PeriodContainer>
              )}
              <Checkbox name="paymentMethod" label="Por Método de Pagamento" />
            </Scope>
          </fieldset>

          <fieldset>
            <legend>Preferência dos Clientes</legend>

            <Scope path="preference">
              <Checkbox name="paymentMethod" label="Por Meios de Pagamento" />
              <Checkbox name="sendingMethod" label="Por Meios de Envio" />
            </Scope>
          </fieldset>

          <fieldset>
            <legend>Importação de planilhas</legend>
            <strong>Envie as planilhas geradas automaticamente pela Loja Integrada</strong>
            
            <FileContextProvider>
              <Dropzone name="spreadsheets" />
              <FileList />
            </FileContextProvider>
          </fieldset>

          <footer>
            <Button type="submit">Enviar</Button>
          </footer>
        </Form>
      </main>
    </Container>
  );
}
