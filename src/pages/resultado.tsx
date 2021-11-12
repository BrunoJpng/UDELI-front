import { Chart } from "../components/Chart";

import { Container } from "../styles/pages/Resultado";

// import { useData } from "../hooks/useData";

import data from "../../data.json"

export default function Resultado() {
  // const { data } = useData();

  return (
    <Container>
      <main>
        {Object.keys(data).map(key => {
          return (
            <Chart key={key} label={key} data={data[key]} />
          )
        })}
      </main>
    </Container>
  );
}