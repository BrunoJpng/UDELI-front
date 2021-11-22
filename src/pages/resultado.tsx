import { BarChart, LineChart, PieChart } from "../components/Charts";

// import { useData } from "../hooks/useData";

import { Container, ChartContainer } from "../styles/pages/Resultado";

import data from "../../data.json"

export default function Resultado() {
  // const { data } = useData();

  return (
    <Container>
      <main>
        {Object.entries(data).map(entry => {
          const [key, value] = entry;
          const isLineChart = key.toLowerCase().includes('período');
          const isPieChart = data[key].length <= 6 && key !== "Preferência por método de pagamento"
          const landscape = isLineChart || !isPieChart

          return (
            <ChartContainer key={key} className={landscape && "landscape"}>
              <h2>{key}</h2>
              {isLineChart 
              ? <LineChart data={value} label={key} /> 
              : (isPieChart 
                ? <PieChart data={value} /> 
                : <BarChart data={value} label={key} />
              )}
            </ChartContainer>
          );
        })}
      </main>
    </Container>
  );
}