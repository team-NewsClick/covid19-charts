import { useState } from "react"
import StatesMapWidget from "./StatesMapWidget"

const StateMapDashboard = ({
  geoJsonData,
  initialViewState,
  covidData,
  regionKey
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
            id="new_cases"
            name="cases"
            value="new_cases"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="new_cases">New Cases</label>
          <input
            type="radio"
            id="total_cases"
            name="cases"
            value="total_cases"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="total_cases">Total Cases</label>
          <input
            type="radio"
            id="total_deaths"
            name="cases"
            value="total_deaths"
            onChange={(e) => _handleCasesType(e)}
          />
          <label htmlFor="total_deaths">Total Deaths</label>
        </div>
      </div>
      <div>
        <StatesMapWidget
          initialViewState={initialViewState}
          geoJsonData={geoJsonData}
          covidData={covidData}
          regionKey={regionKey}
          casesType={casesType}
        />
      </div>
    </div>
  )
}

export default StateMapDashboard
