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
  getInitalViewStateByWidth,
  getMapWidth,
  getMapHeight
} from "../../utils"
import { INITIAL_VIEW_STATE, MAP_COLOR_DOMAIN, MAP_VACCINE_COLOR_DOMAIN } from "../../constants"
import Loading from "../helpers/Loading"
/**
 * Plot Map and Deckgl Layers
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSON, intialView, Data, regionKey, casesType)
 * @return {JSX.Element} Map Widget
 */
const StatesMapWidget = ({ trackerType, casesType }) => {
                   
  const [windowWidth, setWindowWidth] = useState("200")
  const [regionKey, setRegionKey] = useState("")
  const [geoJsonData, setGeoJsonData] = useState({})
  const [covidData, setCovidData] = useState([])
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE)

  useEffect(() => {
    switch (trackerType) {
      case "state":
        setRegionKey("ST_NM")
        break
    }
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : "800")
  }, [])

  useEffect(() => {
    setInitialViewState(
      getInitalViewStateByWidth(windowWidth, initialViewState)
      )
  }, [windowWidth])

  useEffect(() => {
    /**
     * Fetch State GeoJson
     */
    const fetchGeoJsonData = () => {
      fetch(process.env.API_URL_STATES_GEOJSON)
        .then((res) => res.json())
        .then(setGeoJsonData)
    }
    /**
     * Fetch Covid Data
     */
    const fetchCovidData = () => {
      fetch(process.env.API_URL_STATE_COVID_JSON)
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
    colors =
    casesType === "total_vaccinated_per_thousand"
      ? scaleQuantile().domain(domainValues).range(MAP_VACCINE_COLOR_DOMAIN)
      : scaleQuantile().domain(domainValues).range(MAP_COLOR_DOMAIN)
  }

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
      return [255, 255, 255, 255]
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
          <div>
            <div><b>State: ${cases.region}</b></div>
            <div>Active Cases: ${indPlaceVal(cases.active)}</div>
            <div>New Cases: ${indPlaceVal(cases.new_cases)}</div>
            <div>New Deaths: ${indPlaceVal(cases.new_deaths)}</div>
            <div>New Recovered: ${indPlaceVal(cases.new_recovered)}</div>
            <div>Total Cases: ${indPlaceVal(cases.total_cases)}</div>
            <div>Total Deaths: ${indPlaceVal(cases.total_deaths)}</div>
            <div>Total Recovered: ${indPlaceVal(cases.total_recovered)}</div>
            <div>Total Vaccinated: ${indPlaceVal(cases.total_vaccinated)}</div>
          </div>
            `
        }
      )
    }
  }

  const layer =  geoJsonData &&
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
      case "active":
        return "Active Cases"
      case "new_cases":
        return "New Cases"
      case "new_deaths":
        return "New Deaths"
      case "total_cases":
        return "Total Cases"
      case "total_deaths":
        return "Total Deaths"
      case "total_vaccinated_per_thousand":
        return "Vaccinations/1000 Population"
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
          width={getMapWidth(windowWidth)}
          height={getMapHeight(windowWidth)}
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
                  ? { bottom: "1.0rem", right: "5rem", fontSize: "0.8rem" }
                  : { bottom: "4.5rem", right: "12rem", fontSize: "1rem" }
              }
              >
              <div
                className="border-b mb-1 md:mb-2 font-bold leading-4"
              >
                <LegendDescription />
              </div>
              {legends && legends.map((l, i) => (
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
                    {indPlaceVal(l.lowerBound)} - {indPlaceVal(l.upperBound)}
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

export default React.memo(StatesMapWidget)
