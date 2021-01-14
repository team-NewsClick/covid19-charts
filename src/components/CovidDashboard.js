import { useEffect, useState } from "react"
import {
  processLogData,
  filterCases,
  processCumulativeData,
  processDatesAdjusted
} from "../utils"
import {
  CasesType,
  cutoffValues,
  DefaultSelectCountry,
  DefaultSelectState,
  DefaultSelectCity
} from "../constants"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import LineChartWidget from "./LineChartWidget"

const CovidDashboard = (props) => {
  const data = props.data.data
  const trackerType = props.data.trackerType

  const [casesType, setCasesType] = useState("confirmed")
  const [dataType, setDataType] = useState("new")
  const [scaleType, setScaleType] = useState("linear")
  const [datesAdjusted, setDatesAdjusted] = useState("off")
  const [interactiveSelects, setInteractiveSelects] = useState([])
  const [interactiveSelectsDisplay, setInteractiveSelectsDisplay] = useState([])
  const [initBool, setInitBool] = useState(true)

  const propsData = {
    data: null,
    interactiveSelects,
    casesType,
    dataType,
    scaleType,
    datesAdjusted,
    trackerType,
    lineLabel: "",
    footNote: ""
  }
  let chartHeading = ""
  let defaultSelect = {}

  switch (trackerType) {
    case "country":
      defaultSelect = DefaultSelectCountry
      break
    case "state":
      defaultSelect = DefaultSelectState
      break
    case "city":
      defaultSelect = DefaultSelectCity
      break
  }

  const uniqueSelect = [...new Set(data.map((row) => row.region))]
  const dropDownOptions = uniqueSelect.map((row) => {
    return {
      value: row,
      label: row
    }
  })

  if (initBool) {
    setInitBool(false)
    const region = data.filter((d) => {
      return defaultSelect.value === d.region
    })
    const setSelects = [
      {
        label: region[0].region,
        region: region[0].region
      }
    ]
    setInteractiveSelects([...interactiveSelects, ...setSelects])
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

  if (casesType === "confirmed") {
    propsData.lineLabel = "New Cases"
    const initData =
      dataType === "cumulative"
        ? processCumulativeData(
            filterCases(data, CasesType.CONFIRMED, dataType)
          )
        : filterCases(data, CasesType.CONFIRMED)
    const scaleAdjustedData =
      scaleType === "log" ? processLogData(initData) : initData
    propsData.data =
      datesAdjusted === "on"
        ? processDatesAdjusted(scaleAdjustedData, CasesType.CONFIRMED, dataType)
        : scaleAdjustedData
  } else if (casesType === "deaths") {
    propsData.lineLabel = "Deaths"
    const initData =
      dataType === "cumulative"
        ? processCumulativeData(filterCases(data, CasesType.DEATHS, dataType))
        : filterCases(data, CasesType.DEATHS)
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
    <div>
      <div>
        <div className="text-2xl text-center font-black m-2 leading-7">
          COVID19 Tracker
        </div>
        <div className="flex justify-center">
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id="deaths"
              name="cases"
              value="deaths"
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor="deaths">Deaths</label>
            <input
              type="radio"
              id="confirmed"
              name="cases"
              value="confirmed"
              defaultChecked
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor="confirmed">Confirmed</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id="new"
              name="data-type"
              value="new"
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor="new">New</label>
            <input
              type="radio"
              id="cumulative"
              name="data-type"
              value="cumulative"
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor="cumulative">Cumulative</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id="log"
              name="display-type"
              value="log"
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor="log">Log</label>
            <input
              type="radio"
              id="linear"
              name="display-type"
              value="linear"
              defaultChecked
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor="linear">Linear</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id="on"
              name="adjust-date"
              value="on"
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor="on">On</label>
            <input
              type="radio"
              id="off"
              name="adjust-date"
              value="off"
              defaultChecked
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor="off">Off</label>
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
          name="selectOptions"
          onChange={_handleSelectChange}
          defaultValue={defaultSelect}
          options={interactiveSelects.length >= 6 ? [] : dropDownOptions}
          components={{
            NoOptionsMessage: () => (
              <div className="noOptions">
                Maximum number of options selected
              </div>
            )
          }}
          isSearchable
          isMulti
        />
      </div>
      <div
        style={
          window.innerWidth > 800
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
      <LineChartWidget data={propsData} />
    </div>
  )
}

export default CovidDashboard
