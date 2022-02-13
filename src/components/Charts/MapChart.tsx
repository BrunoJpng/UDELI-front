import { useState } from 'react';
import { geoCentroid } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { Text } from '@chakra-ui/react';

type Data = {
  name: string;
  value: number;
}

type MapChartProps = {
  data: Data[];
}

const geoUrl = "https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/topojson/uf.json";

export function MapChart({ data }: MapChartProps) {
  const [stateInfo, setStateInfo] = useState('');
  
  const values = data.map(entry => entry.value);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const colorScale = scaleLinear<string>()
    .domain([min, max])
    .range(["#fff5f5", "#ff5233"]);

  return (
    <>
      <Text fontSize="sm">Clique no estado para ver sua quantidade de pedidos</Text>
      <ComposableMap
        projection="geoAlbers"
        projectionConfig={{
          rotate: [53, 53, 0],
          scale: 800
        }}
        width={600}
        style={{
          margin: "0 auto",
          maxWidth: "1000px",
          maxHeight: "600px"
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geography => {
                const state = data.find(state => state.name === geography.id);
                
                return (
                  <Geography
                    key={geography.rsmKey}
                    stroke="#666"
                    geography={geography}
                    fill={colorScale(state ? state.value : 0)}
                    onClick={() => {
                      const { name } = geography.properties;
                      setStateInfo(`${name} - ${state?.value || 0} pedido(s)`);
                    }}
                  />
                )
              })}
              {geographies.map(geography => {
                const centroid = geoCentroid(geography);

                return (
                  <g key={geography.rsmKey + "-name"}>
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={14} textAnchor="middle">
                        {geography.id}
                      </text>
                    </Marker>
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      {stateInfo}
    </>
  );
}