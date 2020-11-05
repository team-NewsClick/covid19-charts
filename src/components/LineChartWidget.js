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
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { useState } from "react";

export default function LineChartWidget({ data }) {

  if (data.length == 0) {
    return <div>Loading...</div>
  } else {
    const vornoiNodes = [];
    // const covidData = data
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState([]);
    // const [selectedCountries, setSelectedCountries] = useState([
    //   { value: data.data, label: data.country },
    // ]);
    
    //   //Name of countries for Select
      // const countries = [];
      // for (var i = 0; i < data.length; i++) {
      //   countries.push({
      //     label: data[i].country,
      //     value: data[i].data,
      //   });
      // }
    const countries = data.map((row) => {
      return {
        label: row.country,
        value: row.data
      }
    })
    //   //Vornoi Nodes
      for (var i = 0; i < selectedCountries.length; i++) {
        for (var j = 0; j < selectedCountries[i].value.length; j++) {
          vornoiNodes.push({
            x: selectedCountries[i].value[j].x,
            y: selectedCountries[i].value[j].y,
            country: selectedCountries[i].label,
          });
        }
      }
      const handleChange = (options) => {
        setSelectedCountries(options);
      };
    return (
      <div>
        {/* <div style={{ width: "800px", marginTop: "10px"}}> */}
          <Select
            components={makeAnimated()}
            placeholder="Select a region"
            onChange={handleChange}
            // value={selectedCountries}
            options={countries}
            isSearchable
            // isMulti = {true}
            allowSelectAll={true} isMulti={true}
            />
            {/* onChange={setSelectedCountries} */}
        {/* </div> */}
  
        <XYPlot
          xType="time"
          width={800}
          height={450}
          yDomain={[0, 100000]}
          xDomain={[new Date('03/01/2020'), new Date('11/05/2020')]}
          margin={{ left: 60}}
        >
          <XAxis
  tickFormat = {d => d.toLocaleDateString('default', {month: 'short', day: 'numeric'})}
  tickLabelAngle={-30}
/>
          <YAxis />
          {selectedCountries.map((d, index) => (
            <LineSeries key={index} curve={"curveMonotoneX"} data={d.value} />
          ))}
  
          {hoveredNode && <MarkSeries data={[hoveredNode]} />}
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
