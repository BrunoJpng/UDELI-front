import { GetServerSideProps } from "next";
import { BarChart, LineChart, PieChart } from "../components/Charts";

import { Container, ChartContainer } from "../styles/pages/Resultado";

import { api } from "../services/api";

export default function Resultado({ data }) {
  return (
    <Container>
      <main>
        {data.map(current => {
          const formattedData = Object.entries(current.result).map(entry => {
            const [name, value] = entry;
            return { name, value }
          });

          return (
            <ChartContainer key={current.title} className={current.chart !== 'pie' && 'landscape'}>
              <h2>{current.title}</h2>
              {current.chart === 'bar' && <BarChart data={formattedData} label={current.title} />}
              {current.chart === 'pie' && <PieChart data={formattedData} />}
              {current.chart === 'line' && <LineChart data={formattedData} label={current.title} />}
            </ChartContainer>
          )
        })}
      </main>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await api.get('/analysis', { 
    // withCredentials: true,
    // headers: {
    //   Cookie: req.headers.cookie
    // }
  })

  return {
    props: {
      data
    }
  }
}