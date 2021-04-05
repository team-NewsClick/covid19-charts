import { useState, useEffect } from "react"

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
    <div>
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
      {vaccinationViz === "vaccination-chart" ? (
        <iframe
          id="cityTracker"
          src="/charts/VaccinationStateTracker"
          scrolling="no"
          frameBorder="0"
          width={windowWidth > 700 ? windowWidth * 0.67 : windowWidth * 0.95}
          height={
            windowWidth < 800
              ? windowWidth > 700
                ? windowWidth * 0.92
                : windowWidth * 1.6
              : windowWidth * 0.52
          }
          className="mx-auto mt-8"
        ></iframe>
      ) : (
        <iframe
          id="states-map"
          src="/maps/VaccinationStates"
          scrolling="no"
          frameBorder="0"
          width={
            windowWidth < 800
              ? windowWidth > 700
                ? windowWidth * 0.67
                : windowWidth * 0.9
              : windowWidth * 0.4
          }
          height={
            windowWidth < 800
              ? windowWidth > 700
                ? windowWidth * 0.8
                : windowWidth * 1.18
              : windowWidth * 0.48
          }
          className="mx-auto"
        ></iframe>
      )}
    </div>
  )
}

export default StateVaccination
