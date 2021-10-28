import { useState } from "react"
import DistrictsMapWidget from "./DistrictsMapWidget"
import { DIST_MAP_CASE_TYPE as CASE_TYPE } from "../../constants"

/**
 * Dashboard Component for District Map
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSONs, intialView, Data, regionKey)
 * @return {JSX.Element} Radio Buttons and Map Widget
 */
const DistrictsMapDashboard = ({ trackerType }) => {
  const [casesType, setCasesType] = useState(CASE_TYPE.ACTIVE)
  const _handleCasesType = (e) => {
    setCasesType(e.currentTarget.value)
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="radio-toolbar m-2">
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.ACTIVE}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.ACTIVE}
            defaultChecked
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.ACTIVE}>Active Cases</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.CONFIRMED}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.CONFIRMED}
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.CONFIRMED}>Total Cases</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.DECEASED}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.DECEASED}
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.DECEASED}>Total Deaths</label>
        </div>
      </div>
      <div className="pt-8">
        <DistrictsMapWidget trackerType={trackerType} casesType={casesType} />
      </div>
    </div>
  )
}

export default DistrictsMapDashboard
