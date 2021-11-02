import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { Select } from '../components/Select';
import { Input } from '../components/Input';
import { FileList } from '../components/FileList';
import { Upload } from '../components/Upload';

import { useData } from '../hooks/useData';
import { useFiles } from '../hooks/useFiles';

import { api } from '../services/api';

import { Container } from '../styles/pages/Home';

export default function Home() {
  const [city, setCity] = useState(true);
  const [state, setState] = useState(true);
  const [incomesByProduct, setIncomesByProduct] = useState(true);
  const [incomesByPeriod, setIncomesByPeriod] = useState(true);
  const [allCostumers, setAllCostumers] = useState(true);
  const [costumersWithOrders, setCostumersWithOrders] = useState(true);
  const [costumersWithOrdersDelivered, setCostumersWithOrdersDelivered] = useState(true);
  const [repeatCostumers, setRepeatCostumers] = useState(true);
  const [repeatCostumersPercentage, setRepeatCostumersPercentage] = useState(true);
  const [ageGroup, setAgeGroup] = useState(true);
  const [periodsWithMoreRegistrations, setPeriodsWithMoreRegistrations] = useState(true);
  const [cancellationByPeriod, setCancellationByPeriod] = useState(true);
  const [cancellationByPaymentMethod, setCancellationByPaymentMethod] = useState(true);
  const [costumersPreferenceByPaymentMethod, setCostumersPreferenceByPaymentMethod] = useState(true);
  const [costumersPreferenceBySendingMethod, setCostumersPreferenceBySendingMethod] = useState(true);
  
  const { uploadedFiles } = useFiles();
  const { setData } = useData();

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    
    formData.append("city", String(city));
    formData.append("state", String(state));
    formData.append("incomesByProduct", String(incomesByProduct));
    formData.append("incomesByPeriod", String(incomesByPeriod));
    formData.append("allCostumers", String(allCostumers));
    formData.append("costumersWithOrders", String(costumersWithOrders));
    formData.append("costumersWithOrdersDelivered", String(costumersWithOrdersDelivered));
    formData.append("repeatCostumers", String(repeatCostumers));
    formData.append("repeatCostumersPercentage", String(repeatCostumersPercentage));
    formData.append("ageGroup", String(ageGroup));
    formData.append("periodsWithMoreRegistrations", String(periodsWithMoreRegistrations));
    formData.append("cancellationByPeriod", String(cancellationByPeriod));
    formData.append("cancellationByPaymentMethod", String(cancellationByPaymentMethod));
    formData.append("costumersPreferenceByPaymentMethod", String(costumersPreferenceByPaymentMethod));
    formData.append("costumersPreferenceBySendingMethod", String(costumersPreferenceBySendingMethod));
    uploadedFiles.forEach((file) => {
      formData.append("planilhas", file.file);
    })

    try {
      const { data } = await api.post("/upload", formData);
      setData(data);
      router.push("/resultado")
    } catch(error) {
      alert(error.message);
    }
  }

  return (
    <Container>
      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Quantidade de Pedidos por</legend>

            <Input
              name="city"
              label="Cidade"
              type="checkbox"
              checked={city}
              onChange={() => setCity(!city)}
            />
            <Input
              name="state"
              label="Estado"
              type="checkbox"
              checked={state}
              onChange={() => setState(!state)}
            />
          </fieldset>

          <fieldset>
            <legend>Faturamento</legend>

            <Input
              name="incomesByProduct"
              label="Por Produto"
              type="checkbox"
              checked={incomesByProduct}
              onChange={() => setIncomesByProduct(!incomesByProduct)}
            />
            <Input
              name="incomesByPeriod"
              label="Por Período"
              type="checkbox"
              checked={incomesByPeriod}
              onChange={() => setIncomesByPeriod(!incomesByPeriod)}
            />
            {incomesByPeriod && (
              <>
                <Input
                  name="initialDate"
                  label="Data inicial"
                  type="date"
                />
                <Input
                  name="finalDate"
                  label="Data Final"
                  type="date"
                />
                <Select
                  name="frequency"
                  label="Visualizar por:"
                  options={[
                    { value: "dia", label: "Dia" },
                    { value: "mes", label: "Mês" },
                    { value: "ano", label: "Ano" },
                  ]}
                />
              </>
            )}
          </fieldset>
          
          <fieldset>
            <legend>Gênero dos Clientes</legend>

            <Input
              name="allCostumers"
              label="Todos Cadastrados"
              type="checkbox"
              checked={allCostumers}
              onChange={() => setAllCostumers(!allCostumers)}
            />
            <Input
              name="costumersWithOrders"
              label="Apenas clientes que fizeram pedido(s)"
              type="checkbox"
              checked={costumersWithOrders}
              onChange={() => setCostumersWithOrders(!costumersWithOrders)}
            />
            <Input
              name="costumersWithOrdersDelivered"
              label="Apenas clientes com pedido(s) entregue(s)"
              type="checkbox"
              checked={costumersWithOrdersDelivered}
              onChange={() => setCostumersWithOrdersDelivered(!costumersWithOrdersDelivered)}
            />
          </fieldset>

          <fieldset>
            <legend>Reincidência de Compra</legend>

            <Input
              name="repeatCostumers"
              label="Lista de clientes que compraram mais de 1 vez"
              type="checkbox"
              checked={repeatCostumers}
              onChange={() => setRepeatCostumers(!repeatCostumers)}
            />
            <Input
              name="repeatCostumersPercentage"
              label="Porcentagem de clientes reincidentes"
              type="checkbox"
              checked={repeatCostumersPercentage}
              onChange={() => setRepeatCostumersPercentage(!repeatCostumersPercentage)}
            />
          </fieldset>

          <fieldset>
            <legend>Identificação de</legend>

            <Input
              name="ageGroup"
              label="Faixa Etária"
              type="checkbox"
              checked={ageGroup}
              onChange={() => setAgeGroup(!ageGroup)}
            />
            <Input
              name="periodsWithMoreRegistrations"
              label="Períodos com mais cadastros"
              type="checkbox"
              checked={periodsWithMoreRegistrations}
              onChange={() => setPeriodsWithMoreRegistrations(!periodsWithMoreRegistrations)}
            />
            {periodsWithMoreRegistrations && (
              <>
                <Input
                  name="initialDate"
                  label="Data inicial"
                  type="date"
                />
                <Input
                  name="finalDate"
                  label="Data Final"
                  type="date"
                />
                <Select
                  name="frequency"
                  label="Visualizar por:"
                  options={[
                    { value: "dia", label: "Dia" },
                    { value: "mes", label: "Mês" },
                    { value: "ano", label: "Ano" },
                  ]}
                />
              </>
            )}
          </fieldset>

          <fieldset>
            <legend>Taxa de Cancelamento dos Pedidos</legend>

            <Input
              name="cancellationByPeriod"
              label="Por Período"
              type="checkbox"
              checked={cancellationByPeriod}
              onChange={() => setCancellationByPeriod(!cancellationByPeriod)}
            />
            {cancellationByPeriod && (
              <>
                <Input
                  name="initialDate"
                  label="Data inicial"
                  type="date"
                />
                <Input
                  name="finalDate"
                  label="Data Final"
                  type="date"
                />
                <Select
                  name="frequency"
                  label="Visualizar por:"
                  options={[
                    { value: "dia", label: "Dia" },
                    { value: "mes", label: "Mês" },
                    { value: "ano", label: "Ano" },
                  ]}
                />
              </>
            )}
            <Input
              name="cancellationByPaymentMethod"
              label="Por Método de Pagamento"
              type="checkbox"
              checked={cancellationByPaymentMethod}
              onChange={() => setCancellationByPaymentMethod(!cancellationByPaymentMethod)}
            />
          </fieldset>

          <fieldset>
            <legend>Preferência dos Clientes</legend>

            <Input
              name="costumersPreferenceByPaymentMethod"
              label="Por Meios de Pagamento"
              type="checkbox"
              checked={costumersPreferenceByPaymentMethod}
              onChange={() => setCostumersPreferenceByPaymentMethod(!costumersPreferenceByPaymentMethod)}
            />
            <Input
              name="costumersPreferenceBySendingMethod"
              label="Por Meios de Envio"
              type="checkbox"
              checked={costumersPreferenceBySendingMethod}
              onChange={() => setCostumersPreferenceBySendingMethod(!costumersPreferenceBySendingMethod)}
            />
          </fieldset>

          <fieldset>
            <legend>Importação de planilhas</legend>

            <strong>Envie as planilhas geradas automaticamente pela Loja Integrada</strong>

            <div>
              <Upload />
              <FileList />
            </div>
          </fieldset>

          <button type="submit">Analisar</button>
        </form>
      </main>

    </Container>
  )
}
