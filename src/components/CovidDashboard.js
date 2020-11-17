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
  const data = props.data.data
  const newCases = {
    data: props.data.data,
    lineLabel: 'New Cases',
    lineHeading: 'Graphical representation of New Cases of COVID-19',
    scaleType: props.data.scaleType
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
  const rawData = props.data.data
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
    const newCases = {
      data: data,
      lineLabel: 'New Cases',
      lineHeading: 'Graphical representation of New Cases of COVID-19',
      scaleType: props.data.scaleType
    }
    return <LineChartWidget data={newCases} />
  }
}

const CovidDashboard = () => {
  
  const data = fetchCovidData()

  const [casesType, setCasesType] = useState('')
  const [dataType, setDataType] = useState('')
  const [scaleType, setScaleType] = useState('linear')
  const [datesAdjusted, setDatesAdjusted] = useState('')
  
  const propsData = {
    data: data,
    lineLabel: 'New Cases',
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
              onChange={e => setCasesType(e.currentTarget.value)}
            />
            <label for='deaths'>Deaths</label>
            <input
              type='radio'
              id='confirmed'
              name='cases'
              value='confirmed'
              checked='checked'
              onChange={e => setCasesType(e.currentTarget.value)}
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
              onChange={e => setDataType(e.currentTarget.value)}
            />
            <label for='new'>New</label>
            <input
              type='radio'
              id='cumulative'
              name='data-type'
              value='cumulative'
              checked='checked'
              onChange={e => setDataType(e.currentTarget.value)}
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
              checked={scaleType}
              onChange={e => setScaleType(e.currentTarget.value)}
            />
            <label for='log'>Log</label>
            <input
              type='radio'
              id='linear'
              name='display-type'
              value='linear'
              checked={scaleType}
              onChange={e => setScaleType(e.currentTarget.value)}
            />
            <label for='linear'>Linear</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Date adjusted to outbreak start</div>
            <input
              type='radio'
              id='yes'
              name='adjust-date'
              value='yes'
              onChange={e => setDatesAdjusted(e.currentTarget.value)}
            />
            <label for='yes'>Yes</label>
            <input
              type='radio'
              id='no'
              name='adjust-date'
              value='no'
              checked='checked'
              onChange={e => setDatesAdjusted(e.currentTarget.value)}
            />
            <label for='no'>No</label>
          </div>
        </div>
      </div>
      {scaleType && scaleType == 'log' ? <LineChartLog data={propsData} /> : <LineChartLinear data={propsData} />}
    </div>
  )
}

export default CovidDashboard
