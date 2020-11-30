import { useState } from 'react'
import { processLogData, filterCases } from '../utils'
import LineChartWidget from './LineChartWidget'

const LineChart = (props) => {
  const chartProps = props
  if (chartProps.data.data === null) {
    return (
      <div>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    return (
      <div>
        <LineChartWidget data={chartProps.data} />
      </div>
    )
  }
}

const CovidDashboard = (props) => {
  const newCases = filterCases(props.data, 'new_cases')
  const newDeaths = filterCases(props.data, 'new_deaths')

  const [casesType, setCasesType] = useState('confirmed')
  const [dataType, setDataType] = useState('')
  const [scaleType, setScaleType] = useState('linear')
  const [datesAdjusted, setDatesAdjusted] = useState('off')

  const propsData = {
    data: null,
    lineLabel: '',
    lineHeading: '',
    casesType,
    dataType,
    scaleType,
    datesAdjusted
  }

  if (casesType === 'confirmed') {
    propsData.data = scaleType === 'log' ? processLogData(newCases) : newCases
    propsData.lineHeading = 'Graphical representation of New Cases of COVID-19'
    propsData.lineLabel = 'New Cases'
  } else if (casesType === 'deaths') {
    propsData.data = scaleType === 'log' ? processLogData(newDeaths) : newDeaths
    propsData.lineHeading = 'Graphical representation of Deaths of COVID-19'
    propsData.lineLabel = 'Deaths'
  }

  const _handleCasesType = (e) => {
    setCasesType(e.currentTarget.value)
  }
  const _handleDataType = (e) => {
    setDataType(e.currentTarget.value)
  }
  const _handleScaleType = (e) => {
    setScaleType(e.currentTarget.value)
  }
  const _handleDatesAdjusted = (e) => {
    setDatesAdjusted(e.currentTarget.value)
  }

  return (
    <div>
      <div>
        <div className="text-2xl text-center font-black m-3 leading-7">
          COVID19 Country Tracker
        </div>
        <div className='flex justify-center'>
          <div className='radio-toolbar m-2'>
            <input
              type='radio'
              id='deaths'
              name='cases'
              value='deaths'
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor='deaths'>Deaths</label>
            <input
              type='radio'
              id='confirmed'
              name='cases'
              value='confirmed'
              defaultChecked
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor='confirmed'>Confirmed</label>
          </div>
          <div className='radio-toolbar m-2'>
            <input
              type='radio'
              id='new'
              name='data-type'
              value='new'
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor='new'>New</label>
            <input
              type='radio'
              id='cumulative'
              name='data-type'
              value='cumulative'
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor='cumulative'>Cumulative</label>
          </div>
          <div className='radio-toolbar m-2'>
            <input
              type='radio'
              id='log'
              name='display-type'
              value='log'
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor='log'>Log</label>
            <input
              type='radio'
              id='linear'
              name='display-type'
              value='linear'
              defaultChecked
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor='linear'>Linear</label>
          </div>
          <div className='radio-toolbar m-2'>
            <input
              type='radio'
              id='on'
              name='adjust-date'
              value='on'
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor='on'>On</label>
            <input
              type='radio'
              id='off'
              name='adjust-date'
              value='off'
              defaultChecked
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor='off'>Off</label>
            <div className='radio-title'>Date adjusted to outbreak start</div>
          </div>
        </div>
      </div>
      <LineChart data={propsData} />
    </div>
  )
}

export default CovidDashboard
