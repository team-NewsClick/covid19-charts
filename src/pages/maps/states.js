import { useState } from "react"
import useSWR from "swr"
import LoaderFunction from "../../components/LoaderFunction"
import StatesMapDashboard from "../../components/maps/StatesMapDashboard"

const States = () => {
  const [initialViewState, setInitialViewState] = useState({
    latitude: 22.5937,
    longitude: 78.9629,
    zoom: 4.3,
    minZoom: 4.3,
    maxZoom: 4.3
  })

  const { data: geoJsonData, error: geoJsonError } = useSWR("/api/statesGeoJson")
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
    <StatesMapDashboard
      initialViewState={initialViewState}
      geoJsonData={geoJsonData}
      covidData={covidData}
      regionKey={"ST_NM"}
    />
  )
}

export default States
