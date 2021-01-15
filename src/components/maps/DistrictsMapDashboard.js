import { useState } from "react"
import DistrictsMapWidget from "./DistrictsMapWidget"

/**
 * Dashboard Component for District Map
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSONs, intialView, Data, regionKey)
 * @return {JSX.Element} Radio Buttons and Map Widget
 */
const DistrictsMapDashboard = ({
  initialViewState,
  stateGeoJsonData,
  districtGeoJsonData,
  covidData,
  stateRegionKey,
  districtRegionKey
}) => {
  const [casesType, setCasesType] = useState("active")
  const _handleCasesType = (e) => {
    setCasesType(e.currentTarget.value)
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="radio-toolbar m-2">
          <input
            type="radio"
            id="active"
            name="cases"
            value="active"
            defaultChecked
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="active">Active</label>
          <input
            type="radio"
            id="confirmed"
            name="cases"
            value="confirmed"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="confirmed">Confirmed</label>
          <input
            type="radio"
            id="deceased"
            name="cases"
            value="deceased"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="deceased">Deceased</label>
        </div>
      </div>
      <div>
        <DistrictsMapWidget
          initialViewState={initialViewState}
          stateGeoJsonData={stateGeoJsonData}
          districtGeoJsonData={districtGeoJsonData}
          covidData={covidData}
          stateRegionKey={stateRegionKey}
          districtRegionKey={districtRegionKey}
          casesType={casesType}
        />
      </div>
    </div>
  )
}

export default DistrictsMapDashboard
