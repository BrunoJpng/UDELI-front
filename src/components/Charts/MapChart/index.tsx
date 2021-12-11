import { geoCentroid } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

type MapChartProps = {
  data: Array<{
    name: string;
    value: number;
  }>
}

const geoUrl = "https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json";

const colorScale = scaleLinear<string>()
  .domain([0, 114.6])
  .range(["#ffedea", "#ff5233"]);

export function MapChart({ data }: MapChartProps) {
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
                  onClick={() => console.log(state.value)}
                />
              )
            })}
            {geographies.map(geography => {
              const centroid = geoCentroid(geography);
              const cur = data.find(state => state.name === geography.id);
              return (
                <g key={geography.rsmKey + "-name"}>
                  {cur &&
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={14} textAnchor="middle">
                        {cur.name}
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