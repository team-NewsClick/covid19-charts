import { useState, useEffect } from 'react'
import { csvParse } from 'd3-dsv'
import LineChartWidget from './LineChartWidget'

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

function LineChartLinear(props) {
  const data = props.data
  const newCases = {
    data: data,
    lineLabel: 'New Cases',
    lineHeading: 'Graphical representation of New Cases of COVID-19',
    scaleType: 'linear'
  }
  if (data.length === 0) {
    return (
      <div>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    return <LineChartWidget data={newCases} />
  }
}

function LineChartLog(props) {
  const rawData = props.data
  if (rawData.length === 0) {
    return (
      <div>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    const data = rawData.map((rows) => {
      const countryData = rows.data.filter((row) => {
        return row.y !== '0'
      })
      const country = {
        country: rows.country,
        data: countryData
      }
      return country
    })
    console.log('data: ', data)
    const newCases = {
      data: data,
      lineLabel: 'New Cases',
      lineHeading: 'Graphical representation of New Cases of COVID-19',
      scaleType: 'log'
    }
    return <LineChartWidget data={newCases} />
  }
}

const CovidDashboard = () => {
  const data = fetchCovidData()
  const scaleType = 'log'

  if (scaleType === 'linear') {
    return <LineChartLinear data={data} />
  } else if (scaleType === 'log') {
    return <LineChartLog data={data} />
  }
}

export default CovidDashboard
