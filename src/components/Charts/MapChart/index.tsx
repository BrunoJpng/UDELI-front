import { geoCentroid } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

type Data = {
  name: string;
  value: number;
}

type MapChartProps = {
  data: Data[];
}

const geoUrl = "https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/topojson/uf.json";

export function MapChart({ data }: MapChartProps) {
  const values = data.map(entry => entry.value);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const colorScale = scaleLinear<string>()
    .domain([min, max])
    .range(["#ffedea", "#ff5233"]);

  return (
    <ComposableMap
      projection="geoAlbers"
      projectionConfig={{
        rotate: [53, 53, 0],
        scale: 800
      }}
      width={700}
      style={{
        maxWidth: "700px",
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
                  onMouseEnter={() => console.log(state?.name)}
                />
              )
            })}
            {geographies.map(geography => {
              const centroid = geoCentroid(geography);
              const state = data.find(state => state.name === geography.id);

              return (
                <g key={geography.rsmKey + "-name"}>
                  {state &&
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={14} textAnchor="middle">
                        {state.name}
                      </text>
                    </Marker>
                  }
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
}