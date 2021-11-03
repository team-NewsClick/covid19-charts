import { useState, useEffect } from "react"

export const useCovidSummary = () => {

  const [covidSummary, setCovidSummary] = useState()
  
  useEffect(() => {
    fetch(process.env.API_URL_COVIDSUMMARY)
      .then((res) => res.text())
      .then((data) => JSON.parse(data))
      .then(setCovidSummary)
  }, [])

  return covidSummary
}