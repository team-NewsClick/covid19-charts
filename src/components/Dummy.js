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
//   const [hoveredNode, setHoveredNode] = useState({ country: null, data: [] });
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div>
      <XYPlot xType="time" width={300} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {data.cases.map((d, index) => (
          <LineSeries key={index} data={d} />
        ))}

        {hoveredNode && <MarkSeries data={[hoveredNode]} />}
        <Voronoi
          nodes={data.cases[0]}
          onHover={(node) => setHoveredNode(node)}
          onBlur={() => setHoveredNode(null)}
        />

        {/* <Voronoi
          nodes={data}
          onHover={(node) => setHoveredNode({title: node.country, data: node.cases[0]})}
          onBlur={() => setHoveredNode(null)}
        /> */}

         {console.log("hovered nodes: ", hoveredNode)}
       <Crosshair
          values={[hoveredNode]}
          //   titleFormat={(d) => ({
          //     title: d[0].country,
          //     value: d[0].date,
          //   })}
        //   itemsFormat={(d) => [{ title: d[0].x.toString(), value: d[0].y }]}
          itemsFormat={(d) => [{value: d[0].y }]}
        />

        {/* <Crosshair values={[hoveredNode]}>
          <div style={{ background: "black" }}>
            <h3>Values of crosshair:</h3>
            <p>Series 1: {hoveredNode[0].x}</p>
            <p>Series 2: {hoveredNode[0].y}</p>
          </div>
        </Crosshair> */}
      </XYPlot>
    </div>
  );
}
