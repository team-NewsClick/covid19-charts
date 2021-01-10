import { useEffect, useState } from "react"
import DeckGL from "deck.gl"
import { GeoJsonLayer } from "@deck.gl/layers"
import { StaticMap } from "react-map-gl"
import { scaleQuantile } from "d3-scale"
import {
  calcuateMaximum,
  calcuateMinimum,
  normalizeValue,
  calculateDomain
} from "../../utils"

const StatesMapWidget = ({
  geoJsonData,
  initialViewState,
  covidData,
  regionKey,
  casesType
}) => {
  const [jsonData, setJsonData] = useState(geoJsonData)
  useEffect(() => {
    setJsonData((geoJsonData) => ({ ...geoJsonData }))
  }, [casesType])
  const maxValue = calcuateMaximum(covidData, casesType)
  const minValue = calcuateMinimum(covidData, casesType)
  const domainValues = calculateDomain(covidData, casesType)
  let colors = scaleQuantile()
    .domain(domainValues)
    .range([
      [255, 255, 178],
      [254, 217, 118],
      [254, 178, 76],
      [253, 141, 60],
      [240, 59, 32],
      [189, 0, 38]
    ])
  const _fillColor = (d) => {
    const sortByKey = d.properties[regionKey]
    const casesObject = covidData.filter((row) => {
      if (sortByKey == row.region) {
        return row[casesType]
      }
    })
    if (casesObject.length !== 0) {
      const cases = casesObject[0][casesType]
      return colors(normalizeValue(cases, maxValue, minValue))
    } else {
      return [255, 255, 255, 0]
    }
  }
  const _getTooltip = ({ object }) => {
    if (object) {
      const sortByKey = object.properties[regionKey]
      const casesObject = covidData.filter((row) => {
        if (sortByKey == row.region) {
          return row
        }
      })
      const cases = casesObject[0]
      return (
        cases && {
          html: `\
      <div><b>State</b></div>
      <div>${cases.region}</div>
      <div><b>Active Cases</b></div>
      <div>${cases.active}</div>
      <div><b>New Cases</b></div>
      <div>${cases.new_cases}</div>
      <div><b>New Deaths</b></div>
      <div>${cases.new_deaths}</div>
      <div><b>New Recovered</b></div>
      <div>${cases.new_recovered}</div>
      <div><b>Total Cases</b></div>
      <div>${cases.total_cases}</div>
      <div><b>Total Deaths</b></div>
      <div>${cases.total_deaths}</div>
      <div><b>Total Recovered</b></div>
      <div>${cases.total_recovered}</div>
      `
        }
      )
    }
  }
  const layer = [
    new GeoJsonLayer({
      id: "geojson-layer",
      data: jsonData,
      stroked: true,
      filled: true,
      lineWidthScale: 600,
      getFillColor: (d) => _fillColor(d),
      getLineColor: [255, 255, 255, 255],
      getLineWidth: 5,
      pickable: true
    })
  ]

  return (
    <div>
      <DeckGL
        initialViewState={initialViewState}
        pickingRadius={5}
        controller={true}
        layers={layer}
        getTooltip={_getTooltip}
        width={800}
        height={1000}
      >
        <StaticMap
          reuseMaps
          mapboxApiAccessToken={process.env.MAPBOX_BOX_ACCESS_TOKEN}
          preventStyleDiffing={true}
        />
      </DeckGL>
    </div>
  )
}

export default StatesMapWidget
