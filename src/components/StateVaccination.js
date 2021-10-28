import React, { useState, useEffect } from "react"
import VaccinationDashboard from "../components/charts/VaccinationDashboard"
import VaccinationStatesMapWidget from "./maps/VaccinationStateMapWidget"
import { VACCINATION_VIZ } from "../constants"

const StateVaccination = () => {
  const [vaccinationViz, setVaccinationViz] = useState(VACCINATION_VIZ.CHART)
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
          id={VACCINATION_VIZ.CHART}
          name="vaccination-viz"
          value={VACCINATION_VIZ.CHART}
          defaultChecked
          onChange={(e) => _handleVaccinationViz(e)}
        />
        <label htmlFor={VACCINATION_VIZ.CHART} className="vaccinationVizLabel">
          Vaccination Chart
        </label>
        <input
          type="radio"
          id={VACCINATION_VIZ.MAP}
          name="vaccination-viz"
          value={VACCINATION_VIZ.MAP}
          onChange={(e) => _handleVaccinationViz(e)}
        />
        <label htmlFor={VACCINATION_VIZ.MAP} className="vaccinationVizLabel">
          Vaccination Map
        </label>
      </div>
      <div>
        {vaccinationViz === VACCINATION_VIZ.CHART ? (
          <VaccinationDashboard trackerType="state" />
        ) : (
          <VaccinationStatesMapWidget trackerType="state" />
        )}
      </div>
    </div>
  )
}

export default React.memo(StateVaccination)
