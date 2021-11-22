import { geoCentroid } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from './allstates.json';

const geoUrl = "https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json";

const colorScale = scaleLinear()
  .domain([1, 15])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

export function MapChart() {
  return (
    <ComposableMap
      projection="geoAlbers"
      projectionConfig={{
        rotate: [50, 50, 0],
        scale: 700
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => {
              const cur = allStates.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill={colorScale(cur ? cur.val : '#EEE')}
                  onClick={() => console.log(cur.val)}
                />
              )
            })}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.id === geo.id);
              // console.log(centroid[0])
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={14} textAnchor="middle">
                        {cur.id}
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