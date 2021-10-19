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
  INITIAL_VIEW_STATE,
  MAP_COLOR_DOMAIN,
  MAP_VACCINE_COLOR_DOMAIN
} from "../../constants"
import Loading from "../helpers/Loading"
/**
 * Plot Map and Deckgl Layers
 * @component
 * @param {String} param0 - tracker by region - state, country, city.
 * @return {JSX.Element} Map Widget
 */
const VaccinationStatesMapWidget = ({ trackerType }) => {
  const [windowWidth, setWindowWidth] = useState("200")
  const [regionKey, setRegionKey] = useState("")
  const [geoJsonData, setGeoJsonData] = useState({})
  const [vaccinationStateData, setVaccinationStateData] = useState([])
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
    const fetchStateGeoJson = () => {
      fetch(process.env.API_URL_STATES_GEOJSON)
        .then((res) => res.json())
        .then(setGeoJsonData)
    }
    /**
     * Fetch Covid Data
     */
    const fetchVaccinationStateData = () => {
      fetch(process.env.API_URL_STATE_COVID_JSON)
        .then((res) => res.json())
        .then(setVaccinationStateData)
    }
    fetchStateGeoJson()
    fetchVaccinationStateData()
  }, [])

  let maxValue, minValue, domainValues, colors
  if (vaccinationStateData.length !== 0) {
    maxValue =
      vaccinationStateData.length !== 0 &&
      calcuateMaximum(vaccinationStateData, "total_vaccinated_per_one_lakh")
    minValue =
      vaccinationStateData.length !== 0 &&
      calcuateMinimum(vaccinationStateData, "total_vaccinated_per_one_lakh")
    domainValues =
      vaccinationStateData.length !== 0 &&
      calculateDomain(vaccinationStateData, "total_vaccinated_per_one_lakh")
    colors =
      domainValues.length !== 0 &&
      scaleQuantile().domain(domainValues).range(MAP_VACCINE_COLOR_DOMAIN)
  }

  const _fillColor = (d) => {
    const sortByKey = d.properties[regionKey]
    const casesObject = vaccinationStateData.filter((row) => {
      if (sortByKey == row.region) {
        return row["total_vaccinated_per_one_lakh"]
      }
    })
    if (casesObject.length !== 0) {
      const cases = casesObject[0]["total_vaccinated_per_one_lakh"]
      return colors(normalizeValue(cases, maxValue, minValue))
    } else {
      return [255, 255, 255, 255]
    }
  }
  const _getTooltip = ({ object }) => {
    if (object) {
      const sortByKey = object.properties[regionKey]
      const casesObject = vaccinationStateData.filter((row) => {
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
            <div>Vaccinated Per Lakh: ${indPlaceVal(
              cases.total_vaccinated_per_one_lakh
            )}</div>
            <div>Total Vaccinated: ${indPlaceVal(cases.total_vaccinated)}</div>
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

  if (
    geoJsonData &&
    geoJsonData.features &&
    geoJsonData.features.length !== 0 &&
    vaccinationStateData.length !== 0
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
          <div style={{ position: "absolute", right: 7, top: 0, zIndex: 1 }}>
            <NavigationControl />
          </div>
          <StaticMap
            reuseMaps
            mapboxApiAccessToken={process.env.MAPBOX_BOX_ACCESS_TOKEN}
          />
          <div className="relative grid h-full place-items-end p-1">
            <div
              className="relative legends"
              style={
                windowWidth < 700
                  ? { bottom: "2.5rem", right: "5rem", fontSize: "0.8rem" }
                  : { bottom: "6.5rem", right: "9.5rem", fontSize: "1rem" }
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
                Vaccinations/1 Lakh Population
              </div>
              {legends &&
                legends.length !== 0 &&
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

export default React.memo(VaccinationStatesMapWidget)
