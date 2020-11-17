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

function LineChart(props) {
  const newCases = {
    data: null,
    lineLabel: 'New Cases',
    lineHeading: 'Graphical representation of New Cases of COVID-19',
    scaleType: props.data.scaleType,
    datesAdjusted: props.data.datesAdjusted
  }
  if (newCases.data === null) {
    if (props.data.scaleType === 'log') {
      const rawData = props.data.data
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
      newCases.data = data
    } else {
      const data = props.data.data
      newCases.data = data
    }
  }
  if (newCases.data === null) {
    return (
      <div>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    return <LineChartWidget data={newCases} />
  }
}

const CovidDashboard = () => {
  const data = fetchCovidData()

  const [casesType, setCasesType] = useState('')
  const [dataType, setDataType] = useState('')
  const [scaleType, setScaleType] = useState('linear')
  const [datesAdjusted, setDatesAdjusted] = useState('off')

  const propsData = {
    data: data,
    lineLabel: '',
    lineHeading: 'Graphical representation of New Cases of COVID-19',
    scaleType: scaleType,
    casesType: casesType,
    datesAdjusted: datesAdjusted
  }

  return (
    <div>
      <div>
        <div className='inline-flex'>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Cases</div>
            <input
              type='radio'
              id='deaths'
              name='cases'
              value='deaths'
              defaultChecked
              onChange={(e) => setCasesType(e.currentTarget.value)}
            />
            <label for='deaths'>Deaths</label>
            <input
              type='radio'
              id='confirmed'
              name='cases'
              value='confirmed'
              onChange={(e) => setCasesType(e.currentTarget.value)}
            />
            <label for='confirmed'>Confirmed</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Data type</div>
            <input
              type='radio'
              id='new'
              name='data-type'
              value='new'
              onChange={(e) => setDataType(e.currentTarget.value)}
            />
            <label for='new'>New</label>
            <input
              type='radio'
              id='cumulative'
              name='data-type'
              value='cumulative'
              defaultChecked
              onChange={(e) => setDataType(e.currentTarget.value)}
            />
            <label for='cumulative'>Cumulative</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Show Scale as</div>
            <input
              type='radio'
              id='log'
              name='display-type'
              value='log'
              onChange={(e) => setScaleType(e.currentTarget.value)}
            />
            <label for='log'>Log</label>
            <input
              type='radio'
              id='linear'
              name='display-type'
              value='linear'
              defaultChecked
              onChange={(e) => setScaleType(e.currentTarget.value)}
            />
            <label for='linear'>Linear</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Date adjusted to outbreak start</div>
            <input
              type='radio'
              id='on'
              name='adjust-date'
              value='on'
              onChange={(e) => setDatesAdjusted(e.currentTarget.value)}
            />
            <label for='on'>On</label>
            <input
              type='radio'
              id='off'
              name='adjust-date'
              value='off'
              defaultChecked
              onChange={(e) => setDatesAdjusted(e.currentTarget.value)}
            />
            <label for='off'>Off</label>
          </div>
        </div>
      </div>
      <LineChart data={propsData} />
    </div>
  )
}

export default CovidDashboard
