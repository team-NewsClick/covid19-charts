import { useState } from 'react'
import {
  processLogData,
  filterCases,
  processCumulativeData,
  processDatesAdjusted
} from '../utils'
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
    propsData.lineLabel = 'New Cases'
    const initData =
      dataType === 'cumulative'
        ? processCumulativeData(filterCases(data, CasesType.CONFIRMED))
        : filterCases(data, CasesType.CONFIRMED)
    const scaleAdjustedData =
      scaleType === 'log' ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === 'on'
        ? processDatesAdjusted(scaleAdjustedData, CasesType.CONFIRMED)
        : scaleAdjustedData
  } else if (casesType === 'deaths') {
    propsData.lineLabel = 'Deaths'
    const initData =
      dataType === 'cumulative'
        ? processCumulativeData(filterCases(data, CasesType.DEATHS))
        : filterCases(data, CasesType.DEATHS)
    const scaleAdjustedData =
      scaleType === 'log' ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === 'on'
        ? processDatesAdjusted(scaleAdjustedData, CasesType.DEATHS)
        : scaleAdjustedData
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
      <div className='container max-w-lg mx-auto'>
        <div className='text-center m-0'>Select maximum upto six countries to compare</div>
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
      </div>
      <LineChartWidget data={propsData} />
    </div>
  )
}

export default CovidDashboard
