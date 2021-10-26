// import { BarChartWrapper } from "../components/BarChartWrapper";
// import { PieChartWrapper } from "../components/PieChartWrapper";

import { useFiles } from "../hooks/useFiles";

// import styles from '../styles/Charts.module.css'

export default function Charts() {
  // const data = [
  //   { name: "MercadoPago V1", value: 764},
  //   { name: "MercadoPago Boleto", value: 652},
  //   { name: "Pagamento na entrega", value: 16},
  // ]

  const { dataAnalysis } = useFiles();

  return (
    <div>
      Análise { dataAnalysis }
      {/* <PieChartWrapper data={data} />
      <BarChartWrapper data={data} /> */}
    </div>
  );
}