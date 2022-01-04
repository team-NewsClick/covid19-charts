import React, { useState } from "react"
import { STATE_MAP_CASE_TYPE as CASE_TYPE } from "../../constants"
import StatesMapWidget from "./StatesMapWidget"

/**
 * Dashboard Component for State Map
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSON, intialView, Data, regionKey)
 * @returns {JSX.Element} Radio Buttons and Map Widget
 */
const StatesMapDashboard = ({ trackerType }) => {
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
            id={trackerType + "-map-" + CASE_TYPE.NEW_CASES}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.NEW_CASES}
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.NEW_CASES}>New Cases</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.TOTAL_CASES}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.TOTAL_CASES}
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.TOTAL_CASES}>Total Cases</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.NEW_DEATHS}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.NEW_DEATHS}
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.NEW_DEATHS}>New Deaths</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.TOTAL_DEATHS}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.TOTAL_DEATHS}
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-" + CASE_TYPE.TOTAL_DEATHS}>
            Total Deaths
          </label>
        </div>
      </div>
      <StatesMapWidget trackerType="state" casesType={casesType} />
    </div>
  )
}

export default React.memo(StatesMapDashboard)
