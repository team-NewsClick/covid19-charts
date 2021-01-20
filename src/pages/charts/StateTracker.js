import { csvParse } from "d3-dsv"
import { useState, useEffect } from "react"
import CovidDashboard from "../../components/charts/CovidDashboard.js"
import LoaderFunction from "../../components/LoaderFunction"

/**
 * State Line-Chart Page
 * @return {JSX.Element} State Line-Chart Page
 */
const StateTracker = () => {
  const [data, setData] = useState([])
  const propsData = {
    data,
    trackerType: "state"
  }
  useEffect(() => {
    fetch(process.env.API_URL_STATE)
      .then((res) => res.text())
      .then(csvParse)
      .then(setData)
  }, [])
  if (data.length === 0) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <CovidDashboard data={propsData} />
      </div>
    )
  }
}

export default StateTracker
