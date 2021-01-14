import { useState, useEffect } from "react"
import useSWR from "swr"
import LoaderFunction from "../../components/LoaderFunction"
import StatesMapDashboard from "../../components/maps/StatesMapDashboard"

const States = () => {
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

  const { data: geoJsonData, error: geoJsonError } = useSWR(
    "/api/statesGeoJson"
  )
  const { data: covidData, error: covidDataError } = useSWR(
    "/api/statesCovidData"
  )
  if (geoJsonError || covidDataError) return <div>Failed to Load</div>
  if (!geoJsonData || !covidData) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  }
  return (
    <div>
      <StatesMapDashboard
        initialViewState={initialViewState}
        geoJsonData={geoJsonData}
        covidData={covidData}
        regionKey={"ST_NM"}
      />
    </div>
  )
}

export default States
