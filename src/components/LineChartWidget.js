import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  Voronoi,
  MarkSeries,
} from "react-vis"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useState } from "react"

export default function LineChartWidget({ data }) {

  if (data.length == 0) {
    return <div>Loading...</div>
  } else {
    const vornoiNodes = []
    const [hoveredNode, setHoveredNode] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState([{
      label: data[79].country,
      value: data[79].data
    }])
    
    const countries = data.map((row) => {
      return {
        label: row.country,
        value: row.data
      }
    })
    
    for (var i = 0; i < selectedCountries.length; i++) {
      for (var j = 0; j < selectedCountries[i].value.length; j++) {
        vornoiNodes.push({
          x: selectedCountries[i].value[j].x,
          y: selectedCountries[i].value[j].y,
          country: selectedCountries[i].label,
        })
      }
    }
    return (
      <div>
          <Select
            components={makeAnimated()}
            placeholder="Select a region"
            onChange={setSelectedCountries}
            defaultValue={selectedCountries}
            options={countries}
            isSearchable
            allowSelectAll={true}
            isMulti={true}
          />
  
        <XYPlot
          xType="time"
          width={1800}
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
    )
  }
}
