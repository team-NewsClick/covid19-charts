import { useState } from "react"
import DistrictsMapWidget from "./DistrictsMapWidget"

/**
 * Dashboard Component for District Map
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSONs, intialView, Data, regionKey)
 * @return {JSX.Element} Radio Buttons and Map Widget
 */
const DistrictsMapDashboard = ({ trackerType }) => {
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
            id={trackerType+"-map-active"}
            name={trackerType+"-map-cases"}
            value="active"
            defaultChecked
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType+"-map-active"}>Active Cases</label>
          <input
            type="radio"
            id={trackerType+"-map-confirmed"}
            name={trackerType+"-map-cases"}
            value="confirmed"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType+"-map-confirmed"}>Total Cases</label>
          <input
            type="radio"
            id={trackerType+"-map-deceased"}
            name={trackerType+"-map-cases"}
            value="deceased"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType+"-map-deceased"}>Total Deaths</label>
        </div>
      </div>
      <div className="pt-8">
        <DistrictsMapWidget
          trackerType={trackerType}
          casesType={casesType}
          />
      </div>
    </div>
  )
}

export default DistrictsMapDashboard
