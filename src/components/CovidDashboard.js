import { useState, useEffect } from 'react'
import { csvParse } from 'd3-dsv'
import LineChartWidget from './LineChartWidget'
import { render } from 'react-dom'

function fetchCovidData() {
  const [data, setData] = useState([])
  const cutoffDate = new Date('03/01/2020')
  useEffect(() => {
    fetch(process.env.API_URL)
      .then((res) => res.text())
      .then(csvParse)
      .then((rows) =>
        rows.reduce((result, row) => {
          const date = new Date(row.date)
          if (date < cutoffDate) return result
          const found = result.find((a) => a.country === row.country)
          const value = { x: new Date(row.date), y: row.new_cases }
          if (!found) {
            result.push({ country: row.country, data: [value] })
          } else {
            found.data.push(value)
          }
          return result
        }, [])
      )
      .then(setData)
  }, [])
  return data
}

const CovidDashboard = () => {
  const data = fetchCovidData()
  const newCases = {
    data: data,
    lineLabel: 'New Cases',
    lineHeading: 'Graphical representation of New Cases of COVID-19',
  }

  return (
    <div>
      <div>
        <div className='inline-flex'>
          <div className="radio-toolbar m-3">
            <div className="radio-title">Cases</div>
            <input type="radio" id="deaths" name="cases" value="deaths" />
            <label for="deaths">Deaths</label>
            <input
              type="radio"
              id="confirmed"
              name="cases"
              value="confirmed"
              checked="checked"
            />
            <label for="confirmed">Confirmed</label>
          </div>
          <div className="radio-toolbar m-3">
            <div className="radio-title">Data type</div>
            <input type="radio" id="new" name="data-type" value="new" />
            <label for="new">New</label>
            <input
              type="radio"
              id="cumulative"
              name="data-type"
              value="cumulative"
              checked="checked"
            />
            <label for="cumulative">Cumulative</label>
          </div>
          <div className="radio-toolbar m-3">
            <div className="radio-title">Show Scale as</div>
            <input type="radio" id="log" name="display-type" value="log" />
            <label for="log">Log</label>
            <input
              type="radio"
              id="linear"
              name="display-type"
              value="linear"
              checked="checked"
            />
            <label for="linear">Linear</label>
          </div>
          <div className="radio-toolbar m-3">
            <div className="radio-title">Date adjusted to outbreak start</div>
            <input type="radio" id="yes" name="adjust-date" value="yes" />
            <label for="yes">Yes</label>
            <input
              type="radio"
              id="no"
              name="adjust-date"
              value="no"
              checked="checked"
            />
            <label for="no">No</label>
          </div>
        </div>
      </div>
        <LineChartWidget data={newCases} />
    </div>
  )
}

export default CovidDashboard
