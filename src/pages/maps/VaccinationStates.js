import { useState, useEffect } from "react"
import LoaderFunction from "../../components/LoaderFunction"
import VaccinationStateMapWidget from "../../components/maps/VaccinationStateMapWidget"

/**
 * State Map Page
 * @return {JSX.Element} State Map Page
 */
const VaccinationStates = () => {
  const [stateGeoJsonData, setStateGeoJsonData] = useState([])
  const [vaccinationStateData, setVaccinationStateData] = useState([])

  const [windowWidth, setWindowWidth] = useState("200px")
  const [initialViewState, setInitialViewState] = useState({
    latitude: 20.7,
    longitude: 82.8,
    zoom: 4.3,
    minZoom: 4.3,
    maxZoom: 4.3,
    pitch: 0,
    bearing: 0
  })

  useEffect(() => {
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : "800px")
    setInitialViewState(
      windowWidth < 700
        ? windowWidth > 500
          ? {
              ...initialViewState,
              zoom: 3.5,
              minZoom: 2.8,
              maxZoom: 4.3
            }
          : {
              ...initialViewState,
              zoom: 2.9,
              minZoom: 2.5,
              maxZoom: 3.5
            }
        : {
            ...initialViewState,
            zoom: 4.1,
            minZoom: 3.5,
            maxZoom: 5.5
          }
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
  if (stateGeoJsonData.length === 0 || vaccinationStateData.length === 0) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <VaccinationStateMapWidget
          initialViewState={initialViewState}
          geoJsonData={stateGeoJsonData}
          vaccinationStateData={vaccinationStateData}
          regionKey={"ST_NM"}
        />
      </div>
    )
  }
}

export default VaccinationStates
