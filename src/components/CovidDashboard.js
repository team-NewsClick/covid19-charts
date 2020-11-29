import { useState } from 'react'
import { processLogData, filterCases, processCumulativeData } from '../utils'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import LineChartWidget from './LineChartWidget'

const CovidDashboard = (props) => {
  const data = props.data
  const CasesType = {
    CONFIRMED: 'new_cases',
    DEATHS: 'new_deaths'
  }
  const [casesType, setCasesType] = useState('confirmed')
  const [dataType, setDataType] = useState('new')
  const [scaleType, setScaleType] = useState('linear')
  const [datesAdjusted, setDatesAdjusted] = useState('off')
  const [interactiveCountires, setInteractiveCountires] = useState([])
  const [initBool, setInitBool] = useState(true)

  const propsData = {
    data: null,
    interactiveCountires,
    casesType,
    dataType,
    scaleType,
    datesAdjusted,
    lineLabel: ''
  }
  const defaultCountry = {
    value: 'India',
    label: 'India'
  }
  const uniqueCountries = [...new Set(data.map((row) => row.country))]
  const dropDownCountries = uniqueCountries.map((row) => {
    return {
      value: row,
      label: row
    }
  })

  if (initBool) {
    setInitBool(false)
    const country = data.filter((d) => {
      return defaultCountry.value === d.country
    })
    const setCountry = [
      {
        label: country[0].country,
        country: country[0].country
      }
    ]
    setInteractiveCountires([...interactiveCountires, ...setCountry])
  }

  if (casesType === 'confirmed') {
    const initData =
      dataType === 'cumulative'
        ? processCumulativeData(filterCases(data, CasesType.CONFIRMED))
        : filterCases(data, CasesType.CONFIRMED)
    propsData.data = scaleType === 'log' ? processLogData(initData) : initData
    propsData.lineLabel = 'New Cases'
  } else if (casesType === 'deaths') {
    const initData =
    dataType === 'cumulative'
      ? processCumulativeData(filterCases(data, CasesType.DEATHS))
      : filterCases(data, CasesType.DEATHS)
    propsData.data = scaleType === 'log' ? processLogData(initData) : initData
    propsData.lineLabel = 'Deaths'
  }
  const _handleSelectChange = (e) => {
    if (e && e.length > 0) {
      const countries = e.map((row) => {
        const country = data.filter((d) => {
          return row.value === d.country
        })
        return {
          label: country[0].country,
          country: country[0].country
        }
      })
      setInteractiveCountires([...countries.flat()])
    } else {
      setInteractiveCountires([])
    }
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
      <div className='m-4'>
        <Select
          components={makeAnimated}
          placeholder='Select a region'
          name='selectCountries'
          onChange={_handleSelectChange}
          defaultValue={defaultCountry}
          options={interactiveCountires.length >= 6 ? [] : dropDownCountries}
          components={{
            NoOptionsMessage: () => (
              <div className='noOptions'>
                Maximum number of countries selected
              </div>
            )
          }}
          isSearchable
          isMulti
        />
        <div className='m-3'>Select maximum upto six countries to compare</div>
      </div>
      <div>
        <div className='inline-flex'>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Cases</div>
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
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Data type</div>
            <input
              type='radio'
              id='new'
              name='data-type'
              value='new'
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor='new'>New</label>
            <input
              type='radio'
              id='cumulative'
              name='data-type'
              value='cumulative'
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor='cumulative'>Cumulative</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Show Scale as</div>
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
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Date adjusted to outbreak start</div>
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
          </div>
        </div>
      </div>
      <LineChartWidget data={propsData} />
    </div>
  )
}

export default CovidDashboard
