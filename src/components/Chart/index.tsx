import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

import { Container } from './styles';

type ChartProps = {
  data: Object;
  label: string;
}

type FormattedDataProps = Array<{
  name: string;
  value: number;
}>

export function Chart({ data, label }: ChartProps) {
  const formattedData: FormattedDataProps = Object.entries(data).map(entry => {
    const [name, value] = entry;

    return {
      name,
      value,
    }
  });

  return (
    <Container
      className={formattedData.length >= 5 && "landscape"}>
      <h2>{label}</h2>
      {label.includes("período") ? (
        <LineChart data={formattedData} label="Cancelamentos" />
      ) : (
        formattedData.length <= 6 ? (
          <PieChart data={formattedData} />
        ) : (
          <BarChart data={formattedData} />
        )
      )}
    </Container>
  );
}