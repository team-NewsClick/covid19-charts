import React, { useState } from "react"
import StatesMapWidget from "./StatesMapWidget"

/**
 * Dashboard Component for State Map
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSON, intialView, Data, regionKey)
 * @returns {JSX.Element} Radio Buttons and Map Widget
 */
const StatesMapDashboard = ({ trackerType }) => {
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
            id={trackerType + "-map-active"}
            name={trackerType + "-map-cases"}
            value="active"
            defaultChecked
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-active"}>Active Cases</label>
          <input
            type="radio"
            id="new_cases"
            name={trackerType + "-map-cases"}
            value="new_cases"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="new_cases">New Cases</label>
          <input
            type="radio"
            id={trackerType + "-map-total_cases"}
            name={trackerType + "-map-cases"}
            value="total_cases"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-total_cases"}>Total Cases</label>
          <input
            type="radio"
            id={trackerType + "-map-new_deaths"}
            name={trackerType + "-map-cases"}
            value="new_deaths"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-new_deaths"}>New Deaths</label>
          <input
            type="radio"
            id={trackerType + "-map-total_deaths"}
            name={trackerType + "-map-cases"}
            value="total_deaths"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor={trackerType + "-map-total_deaths"}>
            Total Deaths
          </label>
        </div>
      </div>
      {/* <div className="mt-16"> */}
      <StatesMapWidget trackerType="state" casesType={casesType} />
      {/* </div> */}
    </div>
  )
}

export default React.memo(StatesMapDashboard)
