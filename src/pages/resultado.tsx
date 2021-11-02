import { Chart } from "../components/Chart";

import { Container } from "../styles/pages/Resultado";

// import { useCharts } from "../hooks/useCharts";

import data from "../../data.json"

export default function Resultado() {
  // const { data } = useCharts();

  return (
    <Container>
      {Object.keys(data).map(key => {
        return (
          <Chart key={key} label={key} data={data[key]} />
        )
      })}
    </Container>
  );
}