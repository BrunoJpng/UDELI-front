import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';

import { Checkbox, Datepicker, Select } from '../components/Form';

import { useData } from '../hooks/useData';

import { api } from '../services/api';

export default function FormPage() {  
  const [incomesPeriod, setIncomesPeriod] = useState(false);
  const [identificationPeriod, setIdentificationPeriod] = useState(false);
  const [cancellationPeriod, setCancellationPeriod] = useState(false);

  const router = useRouter();
  const formRef = useRef(null);
  const { setData } = useData();

  const handleSubmit = (data) => {
    console.log(data)
    // const formData = new FormData();

    // Object.keys(data).forEach(key => {
    //   if (key === 'spreadsheets') {
    //     data[key].forEach(spreadsheet => formData.append(key, spreadsheet.file));
    //   } else {
    //     formData.append(key, JSON.stringify(data[key]));
    //   }
    // });

    // api.post("/upload", formData)
    //   .then(response => {
    //     console.log(response.data);
    //     setData(response.data);
    //     router.push('/resultado');
    //   })
    //   .catch(err => {
    //     alert(err.message);
    //   })
  }

  const handleSelectAll = () => {
    Object.entries(formRef.current.getData()).forEach(entry => {
      const [key, value] = entry;
      if (key !== "all") {
        formRef.current.setFieldValue(key, !value);
      }
    })
  }

  return (
    <div>
      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Checkbox
            name="all"
            label="Selecionar todas"
            onClick={handleSelectAll}
          />

          <fieldset>
            <legend>Quantidade de Pedidos por</legend>
            <Checkbox name="city" label="Cidade" />
            <Checkbox name="state" label="Estado" />
          </fieldset>

          <fieldset>
            <legend>Faturamento</legend>
            <Checkbox name="incomesByProduct" label="Por Produto" />
            <Checkbox name="incomesByPeriod" label="Por Período" onClick={() => setIncomesPeriod(!incomesPeriod)} />

            {incomesPeriod && (
              <div>
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
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>Gênero dos Clientes</legend>
            <Checkbox name="gender" label="Todos Cadastrados" />
            <Checkbox name="costumersWithOrders" label="Que fizeram pedido(s)" />
            <Checkbox name="costumersWithOrdersDelivered" label="Com pedido(s) entregue(s)" />
          </fieldset>

          <fieldset>
            <legend>Reincidência de Compra</legend>

            <Checkbox name="repeatCostumersList" label="Lista de clientes reincidentes" />
            <Checkbox name="repeatCostumersPercentage" label="Porcentagem de clientes reincidentes" />
          </fieldset>

          <fieldset>
            <legend>Identificação de</legend>

            <Checkbox name="ageGroup" label="Faixa Etária" />
            <Checkbox
              name="periodsWithMoreRegistrations"
              label="Períodos com mais cadastros"
              onClick={() => setIdentificationPeriod(!identificationPeriod)}
            />
            
            {identificationPeriod && (
              <div>
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
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>Taxa de Cancelamento dos Pedidos</legend>

            <Checkbox
              name="cancellationsByPeriod"
              label="Por Período"
              onClick={() => setCancellationPeriod(!cancellationPeriod)}
            />

            {cancellationPeriod && (
              <div>
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
              </div>
            )}
            <Checkbox name="cancellationsByPaymentMethod" label="Por Método de Pagamento" />
          </fieldset>

          <fieldset>
            <legend>Preferência dos Clientes</legend>

            <Checkbox name="paymentMethodPreference" label="Por Meios de Pagamento" />
            <Checkbox name="sendingMethodPreference" label="Por Meios de Envio" />
          </fieldset>

          <footer>
            <button type="submit">Enviar</button>
          </footer>
        </Form>
      </main>
    </div>
  );
}
