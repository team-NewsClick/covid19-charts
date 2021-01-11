import { useState, useEffect } from "react"
import useSWR from "swr"
import LoaderFunction from "../../components/LoaderFunction"
import DistrictsMapDashboard from "../../components/maps/DistrictsMapDashboard"

const Districts = () => {
  const [windowWidth, setWindowWidth] = useState('200px') 
  const [initialViewState, setInitialViewState] = useState({
    latitude: 22.5937,
    longitude: 78.9629,
    zoom: 4.3,
    minZoom: 3.8,
    maxZoom: 10
  })

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : '800px')
    setInitialViewState(
      windowWidth < 800
        ? windowWidth > 700
          ? {
              ...initialViewState,
              zoom: 3.5,
              minZoom: 3.5,
              maxZoom: 10 ,
            }
          : {
              ...initialViewState,
              zoom: 2.9,
              minZoom: 2.9,
              maxZoom: 10,
            }
        : {
            ...initialViewState,
            zoom: 4.3,
            minZoom: 3.8,
            maxZoom: 10,
          }
    )
  }, [windowWidth])

  const { data: stateGeoJsonData, error: stateGeoJsonError } = useSWR(
    "/api/statesGeoJson"
  )
  const { data: districtGeoJsonData, error: districtGeoJsonError } = useSWR(
    "/api/districtsGeoJson"
  )
  const { data, error: covidDataError } = useSWR(
    "/api/districtsCovidData"
  )
  if (stateGeoJsonError || districtGeoJsonError || covidDataError)
    return <div>Failed to Load</div>
  if (!stateGeoJsonData || !districtGeoJsonData || !data) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  }
  const covidData = Object.keys(data)
    .map((stateRow) => {
      return Object.keys(data[stateRow].districtData).map((districtRow) => {
        return {
          state: stateRow,
          district: districtRow,
          active: data[stateRow].districtData[districtRow].active,
          confirmed: data[stateRow].districtData[districtRow].confirmed,
          deceased: data[stateRow].districtData[districtRow].deceased
        }
      })
    })
    .flat()
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
