import { useEffect, useState } from "react"
import DeckGL from "deck.gl"
import { GeoJsonLayer } from "@deck.gl/layers"
import { StaticMap } from "react-map-gl"
import { scaleQuantile } from "d3-scale"
import {
  calcuateMaximum,
  calcuateMinimum,
  normalizeValue,
  calculateDomain,
  sortLegends
} from "../../utils"

const StatesMapWidget = ({
  initialViewState,
  stateGeoJsonData,
  districtGeoJsonData,
  covidData,
  districtRegionKey,
  casesType
}) => {
  const [jsonData, setJsonData] = useState(districtGeoJsonData)
  useEffect(() => {
    setJsonData((districtGeoJsonData) => ({ ...districtGeoJsonData }))
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
    const sortByKey = d.properties[districtRegionKey]
    const casesObject = covidData.filter((row) => {
      if (sortByKey == row.district) {
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
      const sortByKey = object.properties[districtRegionKey]
      const casesObject = covidData.filter((row) => {
        if (sortByKey == row.district) {
          return row
        }
      })
      const cases = casesObject[0]
      return (
        cases && {
          html: `\
          <div>
            <div><b>State</b></div>
            <div>${cases.state}</div>
            <div><b>District</b></div>
            <div>${cases.district}</div>
            <div><b>Active Cases</b></div>
            <div>${cases.active}</div>
            <div><b>Total Cases</b></div>
            <div>${cases.confirmed}</div>
            <div><b>Total Deaths</b></div>
            <div>${cases.deceased}</div>
          </div>
          `
        }
      )
    }
  }
  const layer = [
    new GeoJsonLayer({
      id: "districts-geojson-layer",
      data: jsonData,
      stroked: true,
      filled: true,
      lineWidthScale: 600,
      getFillColor: (d) => _fillColor(d),
      getLineColor: [255, 255, 255, 125],
      getLineWidth: 3,
      pickable: true
    }),
    new GeoJsonLayer({
      id: "states-geojson-layer",
      data: stateGeoJsonData,
      stroked: true,
      filled: false,
      lineWidthScale: 600,
      getFillColor: [255, 255, 255, 0],
      getLineColor: [245, 245, 245, 255],
      getLineWidth: 10,
      pickable: true
    })
  ]
  const colorDomains = colors.domain()
  const legends = sortLegends(maxValue, colors, colorDomains)

  return (
    <div>
      <DeckGL
        initialViewState={initialViewState}
        pickingRadius={5}
        controller={true}
        layers={layer}
        getTooltip={_getTooltip}
        width={window.innerWidth}
        height={window.innerWidth * 1.25}
      >
        <StaticMap
          reuseMaps
          mapboxApiAccessToken={process.env.MAPBOX_BOX_ACCESS_TOKEN}
          preventStyleDiffing={true}
        />
        <div className="flex flex-row-reverse">
          <div className="legends" style={window && window.innerWidth > 500 ? {} : {bottom: "5.5rem"}}>
            {legends.map((l, i) => (
              <div className="flex md:pb-2" key={i}>
                <div className="legend-color" style={{ backgroundColor: `rgb${l.color}` }}></div>
                <div>
                  {l.lowerBound} - {l.upperBound}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DeckGL>
    </div>
  )
}

export default StatesMapWidget
