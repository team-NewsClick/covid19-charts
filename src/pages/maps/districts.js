import { useState, useEffect } from "react"
import LoaderFunction from "../../components/LoaderFunction"
import DistrictsMapDashboard from "../../components/maps/DistrictsMapDashboard"

/**
 * District Map Page
 * @return {JSX.Element} District Map Page
 */
const Districts = () => {
  const [stateGeoJsonData, setStateGeoJsonData] = useState([])
  const [districtGeoJsonData, setDistrictGeoJsonData] = useState([])
  const [covidData, setCovidData] = useState([])

  const [windowWidth, setWindowWidth] = useState("200px")
  const [initialViewState, setInitialViewState] = useState({
    latitude: 20.7,
    longitude: 82.8,
    zoom: 4.3,
    minZoom: 3.8,
    maxZoom: 10
  })

  useEffect(() => {
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : "800px")
    setInitialViewState(
      windowWidth < 700
        ? windowWidth > 500
          ? {
              ...initialViewState,
              zoom: 3.5,
              minZoom: 2,
              maxZoom: 5
            }
          : {
              ...initialViewState,
              zoom: 2.9,
              minZoom: 2.5,
              maxZoom: 5
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
  }, [])

  if (
    stateGeoJsonData.length === 0 ||
    districtGeoJsonData.length === 0 ||
    covidData.length === 0
  ) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  } else {
    return (
      <DistrictsMapDashboard
        initialViewState={initialViewState}
        stateGeoJsonData={stateGeoJsonData}
        districtGeoJsonData={districtGeoJsonData}
        covidData={covidData}
        stateRegionKey={"ST_NM"}
        districtRegionKey={"District"}
      />
    )
  }
}

export default Districts
