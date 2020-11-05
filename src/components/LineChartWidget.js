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
    // const vornoiNodes = [];
    // const covidData = [...data.covidData];
    // const [hoveredNode, setHoveredNode] = useState(null);
    // const [selectedCountries, setSelectedCountries] = useState([
    //   { value: covidData[0].data.activeCases, label: covidData[0].country },
    // ]);
    
    //   //Name of countries for Select
    //   const countries = [];
    //   for (var i = 0; i < covidData.length; i++) {
    //     countries.push({
    //       label: covidData[i].country,
    //       value: covidData[i].data.activeCases,
    //     });
    //   }
  
    //   //Vornoi Nodes
    //   for (var i = 0; i < selectedCountries.length; i++) {
    //     for (var j = 0; j < selectedCountries[i].value.length; j++) {
    //       vornoiNodes.push({
    //         x: selectedCountries[i].value[j].x,
    //         y: selectedCountries[i].value[j].y,
    //         country: selectedCountries[i].label,
    //       });
    //     }
    //   }
  
    // console.log(vornoiNodes);
  
    // return (
    //   <div>
    //     <div style={{ width: "800px", marginTop: "10px"}}>
    //       <Select
    //         components={makeAnimated()}
    //         options={countries}
    //         placeholder="Select a region"
    //         onChange={setSelectedCountries}
    //         isSearchable
    //         isMulti
    //       />
    //     </div>
  
    //     <XYPlot xType="time" width={800} height={300}>
    //       <VerticalGridLines />
    //       <HorizontalGridLines />
    //       <XAxis />
    //       <YAxis />
    //       {selectedCountries.map((d, index) => (
    //         <LineSeries key={index} curve={"curveMonotoneX"} data={d.value} />
    //       ))}
  
    //       {hoveredNode && <MarkSeries data={[hoveredNode]} />}
    //       <Voronoi
    //         nodes={vornoiNodes}
    //         onHover={(node) => setHoveredNode(node)}
    //         onBlur={() => setHoveredNode(null)}
    //       />
    //       <Crosshair
    //         values={[hoveredNode]}
    //         titleFormat={(d) => ({
    //           title: d[0].country,
    //           value: d[0].x.toString(),
    //         })}
    //         itemsFormat={(d) => [{ title: "Active Cases", value: d[0].y }]}
    //       />
    //     </XYPlot>
    //   </div>
    // );
    return (
      <div>
        <p>Data Fetched</p>
      </div>
    )
  }
}
