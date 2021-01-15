import { useState, useEffect } from "react"
import LoaderFunction from "../../components/LoaderFunction"
import StatesMapDashboard from "../../components/maps/StatesMapDashboard"

const States = () => {
  const [stateGeoJsonData, setStateGeoJsonData] = useState([])
  const [covidData, setCovidData] = useState([])

  const [windowWidth, setWindowWidth] = useState("200px")
  const [initialViewState, setInitialViewState] = useState({
    latitude: 20.7,
    longitude: 82.8,
    zoom: 4.3,
    minZoom: 4.3,
    maxZoom: 4.3
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
    const fetchCovidData = () => {
      fetch(process.env.API_URL_STATE_COVID_JSON)
        .then((res) => res.json())
        .then(setCovidData)
    }
    fetchStateGeoJson()
    fetchCovidData()
  }, [])
  if (stateGeoJsonData.length === 0 || covidData.length === 0) {
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
        <StatesMapDashboard
          initialViewState={initialViewState}
          geoJsonData={stateGeoJsonData}
          covidData={covidData}
          regionKey={"ST_NM"}
        />
      </div>
    )
  }
}

export default States
