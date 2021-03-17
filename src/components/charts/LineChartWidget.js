import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  MarkSeries,
  LabelSeries
} from "react-vis"
import LoaderFunction from "../LoaderFunction"
import { useEffect, useState } from "react"
import {
  calculateYMinValue,
  calculateYMaxValue,
  calculateYTickValues,
  calculateXMinValue,
  calculateXMaxValue,
  isNearBy
} from "../../utils"
import { customColor, months } from "../../constants"

/**
 * Linear graph for multiple regions
 * @component
 * @example <LineChartWidget data = {propsData} />
 * @param {Object} props Required data to load the component
 * @param {Array.<Object>} props.data.data Region name and data for line-series
 * @param {Array.<Object>} props.data.data.data {x: Date, y: "number of cases"}
 * @param {string} props.data.data.region Region name
 * @param {string} props.data.lineLabel Data Type for Crosshair, e.g. "New Cases"
 * @param {string} props.data.scaleType "linear" or "log"
 * @param {string} props.data.datesAdjusted "on" or "off"
 * @param {string} props.data.casesType "confirmed" or "deaths"
 * @param {string} props.data.dataType "new" or "cumulative"
 * @param {Array.<Object>} props.data.interactiveSelects {label: "region", region: "region"}
 * @param {string} props.data.footNote Displays when datesadjusted is "on"
 * @return {JSX.Element} Linear graph for multiple regions
 */
const LineChartWidget = (props) => {
  const data = props.data.data
  const lineLabel = props.data.lineLabel
  const scaleType = props.data.scaleType
  const datesAdjusted = props.data.datesAdjusted
  const casesType = props.data.casesType
  const dataType = props.data.dataType
  const interactiveSelects = props.data.interactiveSelects
  const footNote = props.data.footNote

  const [selected, setselected] = useState([])
  const [greyHighlight, setGreyHighlight] = useState(null)
  const [selectedHighlight, setSelectedHighlight] = useState(null)
  const [crosshairValue, setCrosshairValue] = useState(null)
  const [onMouseHover, setOnMouseHover] = useState(false)

  const yMinRangeLog = calculateYMinValue(dataType, casesType, datesAdjusted)
  const yMaxRange = calculateYMaxValue(data)
  const xMinRange = calculateXMinValue(data, datesAdjusted)
  const xMaxRange = calculateXMaxValue(data)

  useEffect(() => {
    if (interactiveSelects && interactiveSelects.length > 0) {
      const selects = interactiveSelects.map((row) => {
        const region = data.filter((d) => {
          return d.region === row.region
        })
        return region
      })
      setselected([...selects.flat()])
    } else {
      setselected([])
    }
  }, [interactiveSelects, casesType, scaleType, dataType, datesAdjusted])

  if (data.length == 0) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  } else {
    const _handleGreyMouseOver = (e, index) => {
      setGreyHighlight(index)
    }
    const _handleGreyMouseOut = (e, index) => {
      setGreyHighlight(null)
    }
    const _handleSelectedMouseOver = (e, index) => {
      setSelectedHighlight(index)
      setOnMouseHover(true)
    }
    const _handleSelectedMouseOut = () => {
      setSelectedHighlight(null)
      setOnMouseHover(false)
      setCrosshairValue(null)
    }
    const _handleCrosshair = (d) => {
      if (onMouseHover) {
        setCrosshairValue([
          {
            x: d.x,
            y: d.y,
            region: selected[selectedHighlight].region,
            date: datesAdjusted === "on" ? d.date : d.x
          }
        ])
      }
    }

    const selectedLabelSeriesData = []
    selected.map((d, index) => {
      if(index === 0) {
        selectedLabelSeriesData.push({
          x: d.data[d.data.length - 1].x,
          y: d.data[d.data.length - 1].y,
          region: d.region,
        })
      } else {
        if(isNearBy({x: d.data[d.data.length - 1].x, y: d.data[d.data.length - 1].y}, selectedLabelSeriesData, xMaxRange, yMaxRange, scaleType)) {
          selectedLabelSeriesData.push({
            x: d.data[d.data.length - 1].x,
            y: scaleType === "linear"
              ? window.innerWidth > 400 ? (parseInt(d.data[d.data.length - 1].y) - (yMaxRange*0.045)).toString() : (parseInt(d.data[d.data.length - 1].y) + (yMaxRange*0.035)).toString()
              : window.innerWidth > 400 ? (parseInt(d.data[d.data.length - 1].y) - (yMaxRange*0.5)).toString() : (parseInt(d.data[d.data.length - 1].y) + (yMaxRange*0.5)).toString(),
            region: d.region,
          })
        } else {
          selectedLabelSeriesData.push({
            x: d.data[d.data.length - 1].x,
            y: d.data[d.data.length - 1].y,
            region: d.region,
          })
        }
      }
    })
   
    return (
      <div>
        <XYPlot
          xType={datesAdjusted === "on" ? "linear" : "time"}
          yType={scaleType}
          width={
            window.innerWidth > 800
              ? window.innerWidth * 1
              : window.innerWidth * 1
          }
          height={
            window.innerWidth > 800
              ? window.innerWidth * 0.55
              : window.innerWidth * 0.85
          }
          xDomain={datesAdjusted === "on" ? null : [xMinRange, xMaxRange]}
          yDomain={
            scaleType === "log" ? [yMinRangeLog, yMaxRange] : [0, yMaxRange]
          }
          margin={
            window.innerWidth > 800
              ? { left: 100, right: 200 }
              : { left: 40, right: 60 }
          }
          onMouseLeave={() => _handleGreyMouseOut()}
          animation={true}
          dontCheckIfEmpty={true}
        >
          <HorizontalGridLines />
          <XAxis
            tickTotal={12}
            tickFormat={(d) =>
              datesAdjusted === "on"
                ? d
                : d.getMonth() === 0
                ? months[d.getMonth()] + " " + d.getFullYear()
                : months[d.getMonth()]
            }
            style={{
              ticks: { stroke: "#acaeb5" },
              text: { stroke: "none" }
            }}
            className={datesAdjusted === "on" ? null : "xTicks"}
          />
          <YAxis
            tickValues={
              scaleType === "log"
                ? calculateYTickValues(yMinRangeLog, yMaxRange)
                : null
            }
            tickFormat={(d) => (d < 1000 ? d : d / 1000 + "k")}
          />
          {greyHighlight != null && (
            <MarkSeries
              data={[
                {
                  x:
                    data[greyHighlight].data[
                      data[greyHighlight].data.length - 1
                    ].x,
                  y:
                    data[greyHighlight].data[
                      data[greyHighlight].data.length - 1
                    ].y
                }
              ]}
              color={"#777"}
            />
          )}
          {greyHighlight != null && (
            <LabelSeries
              data={[
                {
                  x:
                    data[greyHighlight].data[
                      data[greyHighlight].data.length - 1
                    ].x,
                  y:
                    data[greyHighlight].data[
                      data[greyHighlight].data.length - 1
                    ].y,
                  label: data[greyHighlight].region,
                  xOffset: 12
                }
              ]}
              style={{
                fontSize: "0.7rem",
                stroke: "#777"
              }}
              labelAnchorX="start"
              labelAnchorY="central"
            />
          )}
          {data.map((d, index) => (
            <LineSeries
              key={index}
              curve={"curveMonotoneX"}
              data={d.data}
              color={
                greyHighlight != null && greyHighlight == index
                  ? "#777"
                  : "#ccc"
              }
              strokeWidth={
                greyHighlight != null && greyHighlight == index ? 2 : 0.8
              }
              onSeriesMouseOver={(e) => _handleGreyMouseOver(e, index)}
              onSeriesMouseOut={(e) => _handleGreyMouseOut()}
            />
          ))}
          {onMouseHover && (
            <Crosshair
              values={crosshairValue}
              titleFormat={(d) => ({
                title: d[0].region,
                value:
                  datesAdjusted === "on"
                    ? d[0].date.toLocaleDateString("en-GB")
                    : d[0].x.toLocaleDateString("en-GB")
              })}
              itemsFormat={() => [
                { title: `${lineLabel}`, value: crosshairValue[0].y }
              ]}
            />
          )}
          {onMouseHover && crosshairValue && (
            <MarkSeries
              data={[{ x: crosshairValue[0].x, y: crosshairValue[0].y }]}
              color={customColor[selectedHighlight]}
            />
          )}
          {selected.map((d, index) => (
            <MarkSeries
              key={index}
              data={[
                {
                  x: d.data[d.data.length - 1].x,
                  y: d.data[d.data.length - 1].y
                }
              ]}
              color={customColor[index]}
            />
          ))}
          {selected[selectedHighlight] && (
            <LineSeries
              curve={"curveMonotoneX"}
              data={selected[selectedHighlight].data}
              color={customColor[selectedHighlight]}
              strokeWidth={4}
              onNearestXY={(d) => _handleCrosshair(d)}
            />
          )}
          {selected.map((d, index) => (
            <LineSeries
              key={index}
              curve={"curveMonotoneX"}
              data={casesType && d.data}
              color={customColor[index]}
              strokeWidth={2}
              onSeriesMouseOver={(e) => _handleSelectedMouseOver(e, index)}
              onSeriesMouseOut={(e) => _handleSelectedMouseOut()}
            />
          ))}
          {selectedLabelSeriesData.map((d, index) => (
            <LabelSeries
              key={index}
              data={[
                {
                  x: d.x,
                  y: d.y,
                  label: d.region,
                  xOffset: 12
                }
              ]}
              style={
                selectedHighlight == index
                  ? { fontSize: "0.8rem", stroke: customColor[index] }
                  : { fontSize: "0.7rem", stroke: customColor[index] }
              }
              labelAnchorX="start"
              labelAnchorY="central"
            />
          ))}
        </XYPlot>
        <div
          style={
            window.innerWidth > 800
              ? { marginLeft: "8%" }
              : { marginLeft: "13%" }
          }
          className="text-xs text-gray-600"
        >
          {datesAdjusted === "on" ? footNote : ""}
        </div>
      </div>
    )
  }
}

export default LineChartWidget
