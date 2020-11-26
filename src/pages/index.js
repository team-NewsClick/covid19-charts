import { useState, useEffect } from 'react'
import { csvParse } from 'd3-dsv'
import CovidDashboard from '../components/CovidDashboard.js'

const fetchCovidData = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(process.env.API_URL)
      .then((res) => res.text())
      .then(csvParse)
      .then(setData)
  }, [])
  return data
}
const Home = () => {
  const data = fetchCovidData()
  if (data.length === 0) {
    return <div>Loading!!!</div>
  } else {
    return (
      <div>
        <CovidDashboard data={data} />
      </div>
    )
  }
}

export default Home
