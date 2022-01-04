import React, { useState } from "react"
import { WORLD_MAP_VACCINATION_CASE_TYPE as CASE_TYPE } from "../../constants"
import WorldMapVaccinationWidget from "./WorldMapVaccinationWidget"

/**
 * Dashboard Component for State Map
 * @component
 * @param {Object} param0 - Dashboard Objects (GeoJSON, intialView, Data, regionKey)
 * @returns {JSX.Element} Radio Buttons and Map Widget
 */
const WorldMapVaccinationDashboard = ({ trackerType }) => {
  const [casesType, setCasesType] = useState(CASE_TYPE.VACCINATED)
  const _handleCasesType = (e) => {
    setCasesType(e.currentTarget.value)
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="radio-toolbar m-2 justify-center flex flex-wrap">
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.VACCINATED}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.VACCINATED}
            defaultChecked
            onChange={(e) => _handleCasesType(e)}
          />
          <label style={{width: "7rem"}} htmlFor={trackerType + "-map-" + CASE_TYPE.VACCINATED}>Vaccinated</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.FULLY_VACCINATED}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.FULLY_VACCINATED}
            onChange={(e) => _handleCasesType(e)}
          />
          <label style={{width: "7rem"}} htmlFor={trackerType + "-map-" + CASE_TYPE.FULLY_VACCINATED}>Fully Vaccinated</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.VACCINATED_PERCENT}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.VACCINATED_PERCENT}
            onChange={(e) => _handleCasesType(e)}
          />
          <label style={{width: "7rem"}} htmlFor={trackerType + "-map-" + CASE_TYPE.VACCINATED_PERCENT}>Vaccinated %</label>
          <input
            type="radio"
            id={trackerType + "-map-" + CASE_TYPE.FULLY_VACCINATED_PERCENT}
            name={trackerType + "-map-cases"}
            value={CASE_TYPE.FULLY_VACCINATED_PERCENT}
            onChange={(e) => _handleCasesType(e)}
          />
          <label style={{width: "7rem"}} htmlFor={trackerType + "-map-" + CASE_TYPE.FULLY_VACCINATED_PERCENT}>Fully Vaccinated %</label>
        </div>
      </div>
      <WorldMapVaccinationWidget trackerType={trackerType} casesType={casesType} />
    </div>
  )
}

export default React.memo(WorldMapVaccinationDashboard)
