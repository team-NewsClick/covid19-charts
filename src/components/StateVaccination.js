import React, { useState, useEffect } from "react"
import VaccinationDashboard from "../components/charts/VaccinationDashboard"
import VaccinationStatesMapWidget from "./maps/VaccinationStateMapWidget"

const StateVaccination = () => {
  const [vaccinationViz, setVaccinationViz] = useState("vaccination-chart")
  const [windowWidth, setWindowWidth] = useState("200px")
  useEffect(() => {
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : "800px")
  }, [])

  const _handleVaccinationViz = (e) => {
    setVaccinationViz(e.currentTarget.value)
  }

  return (
    <div className="flex flex-col w-full p-0">
      <div className="text-2xl text-center font-black m-2 leading-7">
        Vaccination Tracker
      </div>
      <div className="radio-toolbar m-2 flex justify-center">
        <input
          type="radio"
          id="vaccination-chart"
          name="vaccination-viz"
          value="vaccination-chart"
          defaultChecked
          onChange={(e) => _handleVaccinationViz(e)}
        />
        <label htmlFor="vaccination-chart" className="vaccinationVizLabel">
          Vaccination Chart
        </label>
        <input
          type="radio"
          id="vaccination-map"
          name="vaccination-viz"
          value="vaccination-map"
          onChange={(e) => _handleVaccinationViz(e)}
        />
        <label htmlFor="vaccination-map" className="vaccinationVizLabel">
          Vaccination Map
        </label>
      </div>
      <div>
        {vaccinationViz === "vaccination-chart" ? (
          <VaccinationDashboard trackerType="state" />
        ) : (
          <VaccinationStatesMapWidget trackerType="state" />
        )}
      </div>
    </div>
  )
}

export default React.memo(StateVaccination)
