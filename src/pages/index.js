import { useState, useEffect } from "react"
import { csvParse } from "d3-dsv"
import CovidDashboard from "../components/CovidDashboard.js"
import LoaderFunction from "../components/LoaderFunction"

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(process.env.API_URL)
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
        <CovidDashboard data={data} />
      </div>
    )
  }
}

export default Home
