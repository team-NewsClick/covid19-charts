import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  Voronoi,
  MarkSeries,
  LabelSeries,
} from "react-vis";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";

export default function LineChartWidget({ data }) {
  if (data.length == 0) {
    return <div className="m-3" >Loading...</div>;
  } else {
    const vornoiNodes = [];
    const [hoveredNode, setHoveredNode] = useState(null);
    const [lineOpacity, setLineOpacity] = useState(0.3);
    const [selectedCountries, setSelectedCountries] = useState([
      {
        label: data[79].country,
        value: data[79].data,
      },
    ]);

    const countries = data.map((row) => {
      return {
        label: row.country,
        value: row.data,
      };
    });

    for (var i = 0; i < selectedCountries.length; i++) {
      for (var j = 0; j < selectedCountries[i].value.length; j++) {
        vornoiNodes.push({
          x: selectedCountries[i].value[j].x,
          y: selectedCountries[i].value[j].y,
          country: selectedCountries[i].label,
        });
      }
    }

    const customColor = [
      "#1abc9c",
      "#f1c40f",
      "#2ecc71",
      "#e67e22",
      "#3498db",
      "#9b59b6",
      "#34495e",
      "#16a085",
      "#f39c12",
      "#27ae60",
      "#d35400",
      "#2980b9",
      "#8e44ad",
      "#2c3e50",
    ];

    return (
      <div>
        <div className="m-4">
          <Select
            components={makeAnimated()}
            placeholder="Select a region"
            options={countries}
            onChange={setSelectedCountries}
            defaultValue={selectedCountries}
            options={countries}
            isSearchable
            isMulti
          />
        </div>

        <XYPlot
          xType="time"
          width={window.innerWidth / 1.05}
          height={window.innerWidth / 2.4}
          yDomain={[0, 100000]}
          xDomain={[new Date("03/01/2020"), new Date("11/05/2020")]}
          margin={{ left: 55, right: 70 }}
        >
          <XAxis
            tickFormat={(d) =>
              d.toLocaleDateString("default", {
                month: "short",
                day: "numeric",
              })
            }
            tickLabelAngle={-30}
          />
          <YAxis tickFormat={(v) => v / 1000 + "k"} />
          {selectedCountries.map((d, index) => (
            <LineSeries
              key={index}
              curve={"curveMonotoneX"}
              data={d.value}
              color={customColor[index]}
              opacity={
                hoveredNode && hoveredNode.country === d.label ? 1 : 0.35
              }
            />
          ))}

          {selectedCountries.map((d, index) => (
            <MarkSeries
              key={index}
              data={[
                {
                  x: d.value[d.value.length - 1].x,
                  y: d.value[d.value.length - 1].y,
                },
              ]}
              color={customColor[index]}
              opacity={
                hoveredNode && hoveredNode.country === d.label ? 1 : 0.35
              }
            />
          ))}

          {selectedCountries.map((d, index) => (
            <LabelSeries
              key={index}
              data={[
                {
                  x: d.value[d.value.length - 1].x,
                  y: d.value[d.value.length - 1].y,
                  label: d.label,
                  xOffset: 12,
                },
              ]}
              style={{
                fontSize: "0.8rem",
              }}
              labelAnchorX="start"
              labelAnchorY="central"
            />
          ))}

          {hoveredNode && <MarkSeries data={[hoveredNode]} color={"#333"} stroke={"#fff"} strokeWidth={2} />}
          <Voronoi
            nodes={vornoiNodes}
            onHover={(node) => setHoveredNode(node)}
            onBlur={() => setHoveredNode(null)}
          />
          <Crosshair
            values={[hoveredNode]}
            titleFormat={(d) => ({
              title: d[0].country,
              value: d[0].x.toISOString().slice(0, 10),
            })}
            itemsFormat={(d) => [{ title: "Active Cases", value: d[0].y }]}
          />
        </XYPlot>
      </div>
    );
  }
}
