import React, { useEffect, useState } from "react"
import { csvParse } from "d3-dsv"
import {
  processLogData,
  filterCases,
  processCumulativeData,
  processDatesAdjusted,
  getDefaultSelects
} from "../../utils"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import LineChartWidget from "./LineChartWidget"
import {
  CasesType,
  cutoffValues,
  PER_LAKH,
  CASES_TYPE,
  DATA_TYPE,
  SCALE_TYPE,
  DATE_ADJUSTED
} from "../../constants"

/**
 * Covid Dashboard with option of viewing line series data with different type and condition
 * @component
 * @example <CovidDashBoard data={propsData} />
 * @param {Object} props Required data to load the component
 * @param {Array.<Object>} props.data.data {date(Date Object), rest are strings: active, iso2, new_cases, new_deaths, new_revovered, region, total_cases, total_deaths, total_recovered}
 * @param {string} props.data.trackertype Region type
 * @return {JSX.Element} Buttons with option of viewing data with different type and condition
 */
const CovidDashboard = ({ trackerType }) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState("200")
  const [data, setData] = useState([])
  const [defaultSelect, setDefaultSelect] = useState([])
  const [selectedRegions, setSelectedRegions] = useState([])
  const [casesType, setCasesType] = useState(CASES_TYPE.CONFIRMED)
  const [dataType, setDataType] = useState(DATA_TYPE.NEW)
  const [scaleType, setScaleType] = useState(SCALE_TYPE.LINEAR)
  const [perLakh, setperLakh] = useState(PER_LAKH.OFF)
  const [datesAdjusted, setDatesAdjusted] = useState(DATE_ADJUSTED.OFF)
  const [interactiveSelects, setInteractiveSelects] = useState([])
  const [interactiveSelectsDisplay, setInteractiveSelectsDisplay] = useState([])
  const [initBool, setInitBool] = useState(true)

  useEffect(() => {
    setWindowInnerWidth(
      typeof window !== "undefined" ? window.innerWidth : "800px"
    )
  }, [])

  useEffect(() => {
    let dataURL
    switch (trackerType) {
      case "city":
        dataURL = process.env.API_URL_CITY
        break
      case "state":
        dataURL = process.env.API_URL_STATE
        break
      case "country":
        dataURL = process.env.API_URL_COUNTRY
        break
    }
    fetch(dataURL)
      .then((res) => res.text())
      .then(csvParse)
      .then(setData)
  }, [])

  useEffect(() => {
    data.length !== 0
      ? (setDefaultSelect(getDefaultSelects(data, CasesType.CONFIRMED)),
        setSelectedRegions(getDefaultSelects(data, CasesType.CONFIRMED)))
      : setDefaultSelect([])
  }, [data])

  useEffect(() => {
    let selects = interactiveSelects.map((row) => {
      return row.label
    })
    setInteractiveSelectsDisplay([...selects])
    return () => {
      selects = []
    }
  }, [interactiveSelects])

  const propsData = {
    data: null,
    interactiveSelects,
    casesType,
    dataType,
    scaleType,
    datesAdjusted,
    trackerType,
    perLakh,
    tickTotalValue: 12,
    lineLabel: "",
    footNote: ""
  }
  let chartHeading = ""

  const uniqueSelect = [...new Set(data.map((row) => row.region))]
  const dropDownOptions = uniqueSelect.map((row) => {
    return {
      value: row,
      label: row
    }
  })

  if (initBool && defaultSelect.length !== 0) {
    setInitBool(false)
    const setSelect = defaultSelect.map((row) => {
      return {
        label: row.value,
        region: row.value
      }
    })
    setInteractiveSelects([...interactiveSelects, ...setSelect])
  }

  let initData = []
  if (casesType === CASES_TYPE.CONFIRMED) {
    if (dataType === DATA_TYPE.NEW) {
      propsData.lineLabel = "New Cases"
      initData = filterCases(data, CasesType.CONFIRMED)
    } else {
      propsData.lineLabel = "Total Cases"
      initData = processCumulativeData(
        filterCases(data, CasesType.CONFIRMED, dataType)
      )
    }
    const scaleAdjustedData =
      scaleType === SCALE_TYPE.LOG ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === DATE_ADJUSTED.ON
        ? processDatesAdjusted(scaleAdjustedData, CasesType.CONFIRMED, dataType)
        : scaleAdjustedData
  } else if (casesType === CASES_TYPE.DEATHS) {
    if (dataType === DATA_TYPE.NEW) {
      propsData.lineLabel = "New Deaths"
      initData = filterCases(data, CasesType.DEATHS)
    } else {
      propsData.lineLabel = "Total Deaths"
      initData = processCumulativeData(
        filterCases(data, CasesType.DEATHS, dataType)
      )
    }
    const scaleAdjustedData =
      scaleType === SCALE_TYPE.LOG ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === DATE_ADJUSTED.ON
        ? processDatesAdjusted(scaleAdjustedData, CasesType.DEATHS, dataType)
        : scaleAdjustedData
  }
  if (datesAdjusted === DATE_ADJUSTED.ON) {
    if (dataType === DATA_TYPE.CUMULATIVE) {
      propsData.footNote =
        casesType === CASES_TYPE.CONFIRMED
          ? `Number of days since ${cutoffValues.CUMMULATIVE} cases first recorded`
          : `Number of days since ${cutoffValues.CUMMULATIVE} deaths first recorded`
    } else if (dataType === DATA_TYPE.NEW) {
      propsData.footNote =
        casesType === CASES_TYPE.CONFIRMED
          ? `Number of days since ${cutoffValues.CONFIRMED} cases first recorded`
          : `Number of days since ${cutoffValues.DEATHS} deaths first recorded`
    }
  }

  if (dataType === DATA_TYPE.CUMULATIVE) {
    chartHeading =
      casesType === CASES_TYPE.CONFIRMED
        ? "Cumulative confirmed cases"
        : "Cumulative deaths attributed"
  } else {
    chartHeading =
      casesType === CASES_TYPE.CONFIRMED
        ? "New confirmed cases"
        : "New deaths attributed"
  }

  const _handleSelectChange = (e) => {
    setSelectedRegions(e)
    if (e && e.length > 0) {
      const selects = e.map((row) => {
        const region = data.filter((d) => {
          return row.value === d.region
        })
        return {
          label: region[0].region,
          region: region[0].region
        }
      })
      setInteractiveSelects([...selects.flat()])
    } else {
      setInteractiveSelects([])
      setInteractiveSelectsDisplay([])
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
    <div className="flex flex-col w-full p-0">
      <div>
        <div className="text-2xl text-center font-black m-2 leading-7">
          COVID-19 Tracker
        </div>
        <div className="flex justify-center">
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-" + CASES_TYPE.DEATHS}
              name={trackerType + "-chart-cases"}
              value={CASES_TYPE.DEATHS}
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor={trackerType + "-chart-" + CASES_TYPE.DEATHS}>Deaths</label>
            <input
              type="radio"
              id={trackerType + "-chart-" + CASES_TYPE.CONFIRMED}
              name={trackerType + "-chart-cases"}
              value={CASES_TYPE.CONFIRMED}
              defaultChecked
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor={trackerType + "-chart-" + CASES_TYPE.CONFIRMED}>Cases</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-" + DATA_TYPE.NEW}
              name={trackerType + "-chart-data-type"}
              value={DATA_TYPE.NEW}
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor={trackerType + "-chart-" + DATA_TYPE.NEW}>New</label>
            <input
              type="radio"
              id={trackerType + "-chart-" + DATA_TYPE.CUMULATIVE}
              name={trackerType + "-chart-data-type"}
              value={DATA_TYPE.CUMULATIVE}
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor={trackerType + "-chart-" + DATA_TYPE.CUMULATIVE}>
              Cumulative
            </label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-" + SCALE_TYPE.LOG}
              name={trackerType + "-chart-display-type"}
              value={SCALE_TYPE.LOG}
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor={trackerType + "-chart-" + SCALE_TYPE.LOG}>Log</label>
            <input
              type="radio"
              id={trackerType + "-chart-" + SCALE_TYPE.LINEAR}
              name={trackerType + "-chart-display-type"}
              value={SCALE_TYPE.LINEAR}
              defaultChecked
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor={trackerType + "-chart-" + SCALE_TYPE.LINEAR}>Linear</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-" + DATE_ADJUSTED.ON}
              name={trackerType + "-chart-adjust-date"}
              value={DATE_ADJUSTED.ON}
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor={trackerType + "-chart-" + DATE_ADJUSTED.ON}>On</label>
            <input
              type="radio"
              id={trackerType + "-chart-" + DATE_ADJUSTED.OFF}
              name={trackerType + "-chart-adjust-date"}
              value={DATE_ADJUSTED.OFF}
              defaultChecked
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor={trackerType + "-chart-" + DATE_ADJUSTED.OFF}>Off</label>
            <div className="radio-title">Date adjusted to outbreak start</div>
          </div>
        </div>
      </div>
      <div className="container max-w-xl mx-auto">
        <div className="text-left text-sm mt-2">
          Select maximum upto six options to compare
        </div>
        <Select
          components={makeAnimated}
          placeholder="Select a region"
          name={trackerType + "-chart-selectOptions"}
          onChange={_handleSelectChange}
          defaultValue={defaultSelect}
          value={selectedRegions}
          options={interactiveSelects.length >= 6 ? [] : dropDownOptions}
          components={{
            NoOptionsMessage: () => (
              <div className="noOptions">No options available</div>
            )
          }}
          isSearchable
          isMulti
        />
      </div>
      <div
        style={
          windowInnerWidth > 800
            ? { marginLeft: "5%" }
            : { marginLeft: "5%", marginRight: "5%" }
        }
        className="text-sm text-black-600"
      >
        {interactiveSelectsDisplay && (
          <div className="text-lg font-semibold mt-4">
            {chartHeading} of Covid-19 in{" "}
            {interactiveSelectsDisplay
              .join(", ")
              .replace(/, ([^,]*)$/, " and $1")}
          </div>
        )}
      </div>
      <LineChartWidget data={propsData} className="flex relative" />
    </div>
  )
}

export default React.memo(CovidDashboard)
