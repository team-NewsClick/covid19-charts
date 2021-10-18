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
import {
  MAP_COLOR_DOMAIN,
  DISTRICT_STATE_BORDER_COLOR,
  DISTRICT_BORDER_COLOR,
  INITIAL_VIEW_STATE
} from "../../constants"
import Loading from "../helpers/Loading"
/**
 * Plot Map and Deckgl Layers
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSONs, intialView, Data, regionKey, casesType)
 * @return {JSX.Element} Map Widget
 */
const DistrictsMapWidget = ({ trackerType, casesType }) => {

  const [stateGeoJsonData, setStateGeoJsonData] = useState([])
  const [districtGeoJsonData, setDistrictGeoJsonData] = useState([])
  const [covidData, setCovidData] = useState([])
  const [regionKey, setRegionKey] = useState("")
  const [windowWidth, setWindowWidth] = useState("200px")
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE)

  useEffect(() => {
    switch (trackerType) {
      case "district":
        setRegionKey("District")
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
    const fetchStateGeoJson = () => {
      fetch(process.env.API_URL_STATES_GEOJSON)
        .then((res) => res.json())
        .then(setStateGeoJsonData)
    }
    /**
     * Fetch District GeoJson
     */
    const fetchDistrictGeoJson = () => {
      fetch(process.env.API_URL_DISTRICTS_GEOJSON)
        .then((res) => res.json())
        .then(setDistrictGeoJsonData)
    }
    /**
     * Fetch Covid Data
     */
    const fetchCovidData = () => {
      fetch(process.env.API_URL_DISTRICT_COVID_JSON)
        .then((res) => res.json())
        .then(setCovidData)
    }
    fetchStateGeoJson()
    fetchDistrictGeoJson()
    fetchCovidData()
  }, [casesType])

  let maxValue, minValue, domainValues, colors
  if (covidData.length !== 0) {
    maxValue = calcuateMaximum(covidData, casesType)
    minValue = calcuateMinimum(covidData, casesType)
    domainValues = calculateDomain(covidData, casesType)
    colors = scaleQuantile().domain(domainValues).range(MAP_COLOR_DOMAIN)
  }

  const _fillColor = (d) => {
    const sortByKey = d.properties[regionKey]
    const casesObject = covidData.filter((row) => {
      if (sortByKey == row.district) {
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
      data: districtGeoJsonData,
      stroked: true,
      filled: true,
      lineWidthScale: 600,
      getFillColor: (d) => _fillColor(d),
      getLineColor: DISTRICT_BORDER_COLOR,
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
      getLineColor: DISTRICT_STATE_BORDER_COLOR,
      getLineWidth: 10,
      pickable: true
    })
  ]
  const colorDomains =  colors && colors.length !== 0 && colors.domain()
  const legends =  colors && colors.length !== 0 && sortLegends(maxValue, colors, colorDomains)

  if(
    districtGeoJsonData &&
    districtGeoJsonData.features &&
    districtGeoJsonData.features.length !== 0 &&
    covidData.length !== 0
  ) {
    return (
      <div>
        <DeckGL
          initialViewState={initialViewState}
          pickingRadius={5}
          controller={true}
          layers={layer}
          getTooltip={_getTooltip}
          width={getMapWidth(windowWidth)}
          height={getMapHeight(windowWidth)}
          ContextProvider={MapContext.Provider}
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
                  ? { bottom: "2.5rem", right: "5rem", fontSize: "0.8rem" }
                  : { bottom: "6.5rem", right: "11rem", fontSize: "1rem" }
              }
              >
              <div
                className="border-b mb-1 md:mb-2 font-bold leading-4"
                style={
                  windowWidth < 700
                    ? windowWidth > 500
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
                {casesType == "active"
                  ? "Active Cases"
                  : casesType == "confirmed"
                  ? "Total Cases"
                  : "Total Deaths"}
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
    return(
      <div className="flex h-screen">
        <div className="m-auto">
          <Loading />
        </div>
      </div>
    )
  }
}

export default React.memo(DistrictsMapWidget)
