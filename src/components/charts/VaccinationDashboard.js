import React, { useEffect, useState } from "react"
import { csvParse } from "d3-dsv"
import {
  processLogData,
  filterCases,
  getDefaultSelects
} from "../../utils"
import {
  CasesType,
  DATA_TYPE,
  PER_LAKH,
  SCALE_TYPE
} from "../../constants"
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
  const [dataType, setDataType] = useState(DATA_TYPE.NEW)
  const [scaleType, setScaleType] = useState(SCALE_TYPE.LINEAR)
  const [perLakh, setPerLakh] = useState(PER_LAKH.OFF)
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
      case "state":
        dataURL = process.env.API_URL_STATE_VACCINES
        break
    }
    fetch(dataURL)
      .then((res) => res.text())
      .then(csvParse)
      .then(setData)
  }, [])

  useEffect(() => {
    data.length !== 0
      ? (setDefaultSelect(
          getDefaultSelects(data, CasesType.NEW_DOSES_ADMINISTERED)
        ),
        setSelectedRegions(
          getDefaultSelects(data, CasesType.NEW_DOSES_ADMINISTERED)
        ))
      : setDefaultSelect([])
  }, [data])

  const propsData = {
    data: null,
    interactiveSelects,
    dataType,
    scaleType,
    perLakh,
    trackerType,
    lineLabel: "",
    tickTotalValue: 5
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
  chartHeading =
    dataType === DATA_TYPE.CUMULATIVE
      ? perLakh === PER_LAKH.ON
        ? "Total Vaccinations/Lakh"
        : "Total Vaccinations"
      : perLakh === PER_LAKH.ON
        ? "Daily Vaccinations/Lakh"
        : "Daily Vaccinations"

  propsData.lineLabel =
    dataType === DATA_TYPE.CUMULATIVE
      ? perLakh === PER_LAKH.ON
        ? "Total Vaccinations/Lakh"
        : "Total Vaccinations"
      : perLakh === PER_LAKH.ON
        ? "Vaccinations/Lakh"
        : "Vaccinations"
  initData =
    dataType === DATA_TYPE.CUMULATIVE
      ? perLakh === PER_LAKH.ON
        ? filterCases(data, CasesType.TOTAL_VACCINATED_PER_LAKH)
        : filterCases(data, CasesType.TOTAL_DOSES_ADMINISTERED)
      : perLakh === PER_LAKH.ON
      ? filterCases(data, CasesType.NEW_VACCINATED_PER_LAKH)
      : filterCases(data, CasesType.NEW_DOSES_ADMINISTERED)
  propsData.data = scaleType === SCALE_TYPE.LOG ? processLogData(initData) : initData

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
  const _handleDataType = (e) => {
    setDataType(e.currentTarget.value)
  }
  const _handleScaleType = (e) => {
    setScaleType(e.currentTarget.value)
  }
  const _handlePerLakh = (e) => {
    setPerLakh(e.currentTarget.value)
  }

  return (
    <div className="flex flex-col w-full p-0">
      <div>
        <div className="flex justify-center">
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-" + DATA_TYPE.NEW}
              name={trackerType + "-data-type"}
              value={DATA_TYPE.NEW}
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor={trackerType + "-" + DATA_TYPE.NEW}>New</label>
            <input
              type="radio"
              id={trackerType + "-" + DATA_TYPE.CUMULATIVE}
              name={trackerType + "-data-type"}
              value={DATA_TYPE.CUMULATIVE}
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor={trackerType + "-" + DATA_TYPE.CUMULATIVE}>Cumulative</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-" + SCALE_TYPE.LOG}
              name={trackerType + "-display-type"}
              value={SCALE_TYPE.LOG}
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor={trackerType + "-" + SCALE_TYPE.LOG}>Log</label>
            <input
              type="radio"
              id={trackerType + "-" + SCALE_TYPE.LINEAR}
              name={trackerType + "-display-type"}
              value={SCALE_TYPE.LINEAR}
              defaultChecked
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor={trackerType + "-" + SCALE_TYPE.LINEAR}>Linear</label>
          </div>
          <div className="radio-toolbar m-2">
            <input
              type="radio"
              id={trackerType + "-" + PER_LAKH.OFF}
              name={trackerType + "-perLakh"}
              value={PER_LAKH.OFF}
              defaultChecked
              onChange={(e) => _handlePerLakh(e)}
            />
            <label htmlFor={trackerType + "-" + PER_LAKH.OFF}>Raw</label>
            <input
              type="radio"
              id={trackerType + "-" + PER_LAKH.ON}
              name={trackerType + "-perLakh"}
              value={PER_LAKH.ON}
              onChange={(e) => _handlePerLakh(e)}
            />
            <label htmlFor={trackerType + "-" + PER_LAKH.ON}>Per 1L</label>
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
            {chartHeading} for Covid-19 in{" "}
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

export default React.memo(CovidDashboard)
