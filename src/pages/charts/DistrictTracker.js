import { useState, useEffect } from 'react'
import { csvParse } from 'd3-dsv'
import CovidDashboard from '../../components/CovidDashboard.js'
import LoaderFunction from '../../components/LoaderFunction'

const StateTracker = () => {
  const [data, setData] = useState([])

  const propsData = {
    data,
    trackerType: 'district',
  }

  useEffect(() => {
    fetch(process.env.API_URL_DISTRICT)
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
