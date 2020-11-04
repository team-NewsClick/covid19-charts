import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  Voronoi,
  MarkSeries,
} from "react-vis";

import { useState } from "react";

export default function Dummy({ data }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  //   const [vornoiNodes, setVornoiNodes] = useState([]);

  const vornoiNodes = [];
  const covidData = [...data.covidData];
  console.log(covidData[0]);
  for (var i = 0; i < covidData.length; i++) {
    for (var j = 0; j < covidData[i].data.activeCases.length; j++) {
      vornoiNodes.push({
        ...covidData[i].data.activeCases[j],
        country: covidData[i].country,
      });
    }
  }
  console.log(vornoiNodes);

  return (
    <div>
      <XYPlot xType="time" width={800} height={350}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {covidData.map((d, index) => (
          <LineSeries key={index} data={d.data.activeCases} />
        ))}

        {hoveredNode && <MarkSeries data={[hoveredNode]} />}
        <Voronoi
          nodes={vornoiNodes}
          onHover={(node) => setHoveredNode(node)}
          onBlur={() => setHoveredNode(null)}
        />

        {/* {console.log(...data.covidData)} */}
        {/* {console.log("hovered nodes: ", hoveredNode)} */}
        <Crosshair
          values={[hoveredNode]}
          titleFormat={(d) => ({
            title: d[0].country,
            value: d[0].x.toString(),
          })}
          itemsFormat={(d) => [{ title: 'Active Cases', value: d[0].y }]}
        />
      </XYPlot>
    </div>
  );
}
