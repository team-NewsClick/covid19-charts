import React, { useEffect, useState } from "react"
import DeckGL from "deck.gl"
import { GeoJsonLayer } from "@deck.gl/layers"
import {
  _MapContext as MapContext,
  StaticMap,
  NavigationControl
} from "react-map-gl"
import { scaleQuantile } from "d3-scale"
import {
  calcuateMaximum,
  calcuateMinimum,
  normalizeValue,
  calculateDomain,
  sortLegends,
  indPlaceVal,
  getInitalViewStateByWidthWorld,
  getMapWidthWorld,
  getMapHeightWorld
} from "../../utils"
import {
  GEOJSON_PATH,
  WORLD_INITIAL_VIEW_STATE,
  MAP_COLOR_DOMAIN,
  MAP_VACCINE_COLOR_DOMAIN,
  WORLD_MAP_VACCINATION_CASE_TYPE as CASE_TYPE
} from "../../constants"
import Loading from "../helpers/Loading"
/**
 * Plot Map and Deckgl Layers
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSON, intialView, Data, regionKey, casesType)
 * @return {JSX.Element} Map Widget
 */
const WorldMapVaccinationWidget = ({ trackerType, casesType }) => {
  const [windowWidth, setWindowWidth] = useState("200")
  const [regionKey, setRegionKey] = useState("")
  const [geoJsonData, setGeoJsonData] = useState({})
  const [covidData, setCovidData] = useState([])
  const [initialViewState, setInitialViewState] = useState(WORLD_INITIAL_VIEW_STATE)

  useEffect(() => {
    switch (trackerType) {
      case "country":
        setRegionKey("id")
        break
    }
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : "800")
  }, [])

  useEffect(() => {
    setInitialViewState(
      getInitalViewStateByWidthWorld(windowWidth, initialViewState)
    )
  }, [windowWidth])

  useEffect(() => {
    /**
     * Fetch State GeoJson
     */
    const fetchGeoJsonData = () => {
      fetch(GEOJSON_PATH.COUNTRIES)
        .then((res) => res.json())
        .then(setGeoJsonData)
    }
    /**
     * Fetch Covid Data
     */
    const fetchCovidData = () => {
      fetch(process.env.API_URL_GLOBAL_JSON_VACCINATIONS)
        .then((res) => res.json())
        .then(setCovidData)
    }
    fetchGeoJsonData()
    fetchCovidData()
  }, [casesType])

  let maxValue, minValue, domainValues, colors
  if (covidData.length !== 0) {
    maxValue = calcuateMaximum(covidData, casesType)
    minValue = calcuateMinimum(covidData, casesType)
    domainValues = calculateDomain(covidData, casesType)
    colors = scaleQuantile().domain(domainValues).range(MAP_VACCINE_COLOR_DOMAIN)
  }

  const _fillColor = (d) => {
    const sortByKey = d.properties[regionKey]
    const casesObject = covidData.filter((row) => {
      if (sortByKey == row.iso_code) {
        return row[casesType]
      }
    })
    if (casesObject.length !== 0) {
      const cases = casesObject[0][casesType]
      return colors(normalizeValue(cases, maxValue, minValue))
    } else {
      return [255, 255, 255, 255]
    }
  }
  const _getTooltip = ({ object }) => {
    if (object) {
      const sortByKey = object.properties[regionKey]
      const casesObject = covidData.filter((row) => {
        if (sortByKey == row.iso_code) {
          return row
        }
      })
      const cases = casesObject[0]
      return (
        cases && {
          html: `\
          <div>
            <div><b>Country: ${cases.region}</b></div>
            <div>Partially Vaccinated: ${indPlaceVal(cases.people_vaccinated)}</div>
            <div>Fully Vaccinated: ${indPlaceVal(cases.people_fully_vaccinated)}</div>
            <div>Partially Vaccinated Percent: ${cases.people_vaccinated_per_hundred}%</div>
            <div>Fully Vaccinated Percent: ${cases.people_fully_vaccinated_per_hundred}%</div>
          </div>
            `
        }
      )
    }
  }

  const layer = geoJsonData &&
    geoJsonData.length !== 0 && [
      new GeoJsonLayer({
        id: "geojson-layer",
        data: geoJsonData,
        stroked: true,
        filled: true,
        lineWidthScale: 600,
        getFillColor: (d) => _fillColor(d),
        getLineColor: [255, 255, 255, 255],
        getLineWidth: 5,
        pickable: true
      })
    ]

  const colorDomains = colors && colors.length !== 0 && colors.domain()
  const legends =
    colors && colors.length !== 0 && sortLegends(maxValue, colors, colorDomains)

  const LegendDescription = () => {
    switch (casesType) {
      case CASE_TYPE.VACCINATED:
        return "Partially Vaccinated"
      case CASE_TYPE.FULLY_VACCINATED:
        return "Fully Vaccinated"
      case CASE_TYPE.VACCINATED_PERCENT:
        return "Partially Vaccinated %"
      case CASE_TYPE.FULLY_VACCINATED_PERCENT:
        return "Fully Vaccinated %"
      default:
        return ""
    }
  }

  if (
    geoJsonData &&
    geoJsonData.features &&
    geoJsonData.features.length !== 0 &&
    covidData.length !== 0
  ) {
    return (
      <div className="flex relative my-8 justify-center">
        <DeckGL
          initialViewState={initialViewState}
          pickingRadius={5}
          controller={true}
          layers={layer}
          getTooltip={_getTooltip}
          width={getMapWidthWorld(windowWidth)}
          height={getMapHeightWorld(windowWidth)}
          ContextProvider={MapContext.Provider}
          className="flex relative p-1"
        >
          <div style={{ position: "absolute", right: 7, top: 5, zIndex: 1 }}>
            <NavigationControl />
          </div>
          <StaticMap
            reuseMaps
            mapboxApiAccessToken={process.env.MAPBOX_BOX_ACCESS_TOKEN}
            preventStyleDiffing={true}
          />
          <div className="relative grid h-full place-items-end p-1">
            <div
              className="relative legends"
              style={
                windowWidth < 700
                  ? { bottom: "0.25rem", right: "0.25rem", fontSize: "0.8rem" }
                  : { bottom: "2em", right: "2rem", fontSize: "1rem" }
              }
            >
              <div className="border-b mb-1 md:mb-2 font-bold leading-4">
                <LegendDescription />
              </div>
              {legends &&
                legends.map((l, i) => (
                  <div
                    key={i}
                    className="flex leading-4"
                    style={
                      windowWidth < 700
                        ? windowWidth > 500
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
                      {l.lowerBound} - {l.upperBound}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </DeckGL>
      </div>
    )
  } else {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <Loading />
        </div>
      </div>
    )
  }
}

export default React.memo(WorldMapVaccinationWidget)
