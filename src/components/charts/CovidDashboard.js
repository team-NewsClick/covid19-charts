import React, { useEffect, useState } from "react"
import { csvParse } from "d3-dsv"
import {
  processLogData,
  filterCases,
  processCumulativeData,
  processDatesAdjusted,
  getDefaultSelects
} from "../../utils"
import { CasesType, cutoffValues } from "../../constants"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import LineChartWidget from "./LineChartWidget"

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
  const [casesType, setCasesType] = useState("confirmed")
  const [dataType, setDataType] = useState("new")
  const [scaleType, setScaleType] = useState("linear")
  const [perLakh, setperLakh] = useState("off")
  const [datesAdjusted, setDatesAdjusted] = useState("off")
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
  useEffect(() => {
    let selects = interactiveSelects.map((row) => {
      return row.label
    })
    setInteractiveSelectsDisplay([...selects])
    return () => {
      selects = []
    }
  }, [interactiveSelects])

  let initData = []
  if (casesType === "confirmed") {
    if (dataType === "new") {
      propsData.lineLabel = "New Cases"
      initData = filterCases(data, CasesType.CONFIRMED)
    } else {
      propsData.lineLabel = "Total Cases"
      initData = processCumulativeData(
        filterCases(data, CasesType.CONFIRMED, dataType)
      )
    }
    const scaleAdjustedData =
      scaleType === "log" ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === "on"
        ? processDatesAdjusted(scaleAdjustedData, CasesType.CONFIRMED, dataType)
        : scaleAdjustedData
  } else if (casesType === "deaths") {
    if (dataType === "new") {
      propsData.lineLabel = "New Deaths"
      initData = filterCases(data, CasesType.DEATHS)
    } else {
      propsData.lineLabel = "Total Deaths"
      initData = processCumulativeData(
        filterCases(data, CasesType.DEATHS, dataType)
      )
    }
    const scaleAdjustedData =
      scaleType === "log" ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === "on"
        ? processDatesAdjusted(scaleAdjustedData, CasesType.DEATHS, dataType)
        : scaleAdjustedData
  }
  if (datesAdjusted === "on") {
    if (dataType === "cumulative") {
      propsData.footNote =
        casesType === "confirmed"
          ? `Number of days since ${cutoffValues.CUMMULATIVE} cases first recorded`
          : `Number of days since ${cutoffValues.CUMMULATIVE} deaths first recorded`
    } else if (dataType === "new") {
      propsData.footNote =
        casesType === "confirmed"
          ? `Number of days since ${cutoffValues.CONFIRMED} cases first recorded`
          : `Number of days since ${cutoffValues.DEATHS} deaths first recorded`
    }
  }

  if (dataType === "cumulative") {
    chartHeading =
      casesType === "confirmed"
        ? "Cumulative confirmed cases"
        : "Cumulative deaths attributed"
  } else {
    chartHeading =
      casesType === "confirmed"
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
              id={trackerType + "-chart-deaths"}
              name={trackerType + "-chart-cases"}
              value="deaths"
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor={trackerType + "-chart-deaths"}>Deaths</label>
            <input
              type="radio"
              id={trackerType + "-chart-confirmed"}
              name={trackerType + "-chart-cases"}
              value="confirmed"
              defaultChecked
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor={trackerType + "-chart-confirmed"}>Cases</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-new"}
              name={trackerType + "-chart-data-type"}
              value="new"
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor={trackerType + "-chart-new"}>New</label>
            <input
              type="radio"
              id={trackerType + "-chart-cumulative"}
              name={trackerType + "-chart-data-type"}
              value="cumulative"
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor={trackerType + "-chart-cumulative"}>
              Cumulative
            </label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-log"}
              name={trackerType + "-chart-display-type"}
              value="log"
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor={trackerType + "-chart-log"}>Log</label>
            <input
              type="radio"
              id={trackerType + "-chart-linear"}
              name={trackerType + "-chart-display-type"}
              value="linear"
              defaultChecked
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor={trackerType + "-chart-linear"}>Linear</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-chart-on"}
              name={trackerType + "-chart-adjust-date"}
              value="on"
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor={trackerType + "-chart-on"}>On</label>
            <input
              type="radio"
              id={trackerType + "-chart-off"}
              name={trackerType + "-chart-adjust-date"}
              value="off"
              defaultChecked
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor={trackerType + "-chart-off"}>Off</label>
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
