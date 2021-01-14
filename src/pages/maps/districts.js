import { useState, useEffect } from "react"
import useSWR from "swr"
import LoaderFunction from "../../components/LoaderFunction"
import DistrictsMapDashboard from "../../components/maps/DistrictsMapDashboard"

const Districts = () => {
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

  const { data: stateGeoJsonData, error: stateGeoJsonError } = useSWR(
    "/api/statesGeoJson"
  )
  const { data: districtGeoJsonData, error: districtGeoJsonError } = useSWR(
    "/api/districtsGeoJson"
  )
  const { data: covidData, error: covidDataError } = useSWR(
    "/api/districtsCovidData"
  )
  if (stateGeoJsonError || districtGeoJsonError || covidDataError)
    return <div>Failed to Load</div>
  if (!stateGeoJsonData || !districtGeoJsonData || !covidData) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  }
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

export default Districts
