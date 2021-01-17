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
  sortLegends,
  indPlaceVal
} from "../../utils"

/**
 * Plot Map and Deckgl Layers
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSONs, intialView, Data, regionKey, casesType)
 * @return {JSX.Element} Map Widget
 */
const DistrictsMapWidget = ({
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
            <div><b>State: ${cases.state}</b></div>
            <div><b>District: ${cases.district}</b></div>
            <div>Active Cases: ${indPlaceVal(cases.active)}</div>
            <div>Total Cases: ${indPlaceVal(cases.confirmed)}</div>
            <div>Total Deaths: ${indPlaceVal(cases.deceased)}</div>
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
          <div
            className="legends"
            style={
              window && window.innerWidth < 700
                ? window.innerWidth > 500
                  ? { bottom: "2.5rem", right: "8.5rem", fontSize: "0.8rem" }
                  : { bottom: "0.2rem", right: "4.5rem" }
                : { bottom: "6.5rem", right: "15rem", fontSize: "1rem" }
            }
          >
            <div
              className="border-b mb-1 md:mb-2 font-bold leading-4"
              style={
                window && window.innerWidth < 700
                  ? window.innerWidth > 500
                    ? {
                        paddingBottom: "0.25rem",
                        marginBottom: "0.25rem",
                        marginTop: "0.25rem"
                      }
                    : {}
                  : {
                      paddingBottom: "0.50rem",
                      marginBottom: "0.50rem",
                      marginTop: "0.50rem"
                    }
              }
            >
              Number of Cases
            </div>
            {legends.map((l, i) => (
              <div
                key={i}
                className="flex leading-4"
                style={
                  window && window.innerWidth < 700
                    ? window.innerWidth > 500
                      ? { paddingBottom: "0.25rem" }
                      : {}
                    : { paddingBottom: "0.5rem" }
                }
              >
                <div
                  className="legend-color"
                  style={{ backgroundColor: `rgb${l.color}` }}
                ></div>
                <div>
                  {indPlaceVal(l.lowerBound)} - {indPlaceVal(l.upperBound)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DeckGL>
    </div>
  )
}

export default DistrictsMapWidget
