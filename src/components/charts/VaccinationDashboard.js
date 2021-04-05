import { useEffect, useState } from "react"
import {
  processLogData,
  filterCases,
  processCumulativeData,
  processPopulationPerThousand
} from "../../utils"
import {
  CasesType,
  cutoffValues,
  DefaultSelectCountry,
  DefaultSelectState,
  DefaultSelectCity
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
const CovidDashboard = (props) => {
  const data = props.data.data
  const trackerType = props.data.trackerType

  const [dataType, setDataType] = useState("new")
  const [scaleType, setScaleType] = useState("linear")
  const [populationPerThousand, setPopulationPerThousand] = useState("off")
  const [interactiveSelects, setInteractiveSelects] = useState([])
  const [interactiveSelectsDisplay, setInteractiveSelectsDisplay] = useState([])
  const [initBool, setInitBool] = useState(true)

  const propsData = {
    data: null,
    interactiveSelects,
    dataType,
    scaleType,
    populationPerThousand,
    trackerType,
    lineLabel: "",
    tickTotalValue: 5
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
  switch (dataType) {
    case "cumulative":
      chartHeading = "Cumulative Vaccination"
      propsData.lineLabel = "Total Vaccination"
      initData = processCumulativeData(filterCases(data, CasesType.TOTAL_DOSES_ADMINISTERED))
      break
    case "new":
      chartHeading = "Daily Vaccination"
      propsData.lineLabel = "Vaccination"
      initData = filterCases(data, CasesType.NEW_DOSES_ADMINISTERED)
      break
    case "per-thousand":
      chartHeading = "Vaccination/1000 population"
      propsData.lineLabel = "Vaccination/1000"
      initData = filterCases(data, CasesType.TOTAL_VACCINATED_PER_THOUSAND)
      break
  }
  propsData.data = scaleType === "log" ? processLogData(initData) : initData

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
  const _handleDataType = (e) => {
    setDataType(e.currentTarget.value)
  }
  const _handleScaleType = (e) => {
    setScaleType(e.currentTarget.value)
  }
  const _handlePopulationPerThousand = (e) => {
    setPopulationPerThousand(e.currentTarget.value)
  }

  return (
    <div>
      <div>
        <div className="flex justify-center">
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
            <input
              type="radio"
              id="per-thousand"
              name="data-type"
              value="per-thousand"
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor="per-thousand">Per Thousand</label>
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
                No options available
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

export default CovidDashboard
