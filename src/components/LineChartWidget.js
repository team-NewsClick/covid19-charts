import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  MarkSeries,
  LabelSeries
} from 'react-vis'
import { useEffect, useState } from 'react'
import {
  calculateMinValue,
  calculateMaxValue,
  calculateTickValues
} from '../utils'
import { customColor, cutoffValues } from '../constants'

const LineChartWidget = (props) => {
  const data = props.data.data
  const lineLabel = props.data.lineLabel
  const scaleType = props.data.scaleType
  const datesAdjusted = props.data.datesAdjusted
  const casesType = props.data.casesType
  const dataType = props.data.dataType
  const interactiveCountires = props.data.interactiveCountires
  const footNote = props.data.footNote

  const [selectedCountries, setSelectedCountries] = useState([])
  const [greyHighlight, setGreyHighlight] = useState(null)
  const [selectedHighlight, setSelectedHighlight] = useState(null)
  const [crosshairValue, setCrosshairValue] = useState(null)
  const [onMouseHover, setOnMouseHover] = useState(false)

  const yMinRangeLog = calculateMinValue(dataType, casesType, datesAdjusted)
  const yMaxRange = calculateMaxValue(data)

  useEffect(() => {
    if (interactiveCountires && interactiveCountires.length > 0) {
      const countires = interactiveCountires.map((row) => {
        const country = data.filter((d) => {
          return d.country === row.country
        })
        return country
      })
      setSelectedCountries([...countires.flat()])
    } else {
      setSelectedCountries([])
    }
  }, [interactiveCountires, casesType, scaleType, dataType, datesAdjusted])

  if (data.length == 0) {
    return (
      <div>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    const _getFinalDate = () => {
      const selectedObject = data[0]
      const dateObject = selectedObject.data[
        selectedObject.data.length - 1
      ].x.toLocaleDateString('en-US')
      return new Date(dateObject)
    }
    const _getDaysFromDate = (date) => {
      const firstDate = new Date(cutoffValues.DATE)
      const diff =
        (date.getTime() - firstDate.getTime()) / (1000 * 3600 * 24) + 1
      return diff
    }
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
            country: selectedCountries[selectedHighlight].country
          }
        ])
      }
    }

    return (
      <div>
        <XYPlot
          xType='time'
          yType={scaleType}
          width={
            window.innerWidth > 500
              ? window.innerWidth * 0.6
              : window.innerWidth * 1.45
          }
          height={
            window.innerWidth > 500
              ? window.innerWidth * 0.35
              : window.innerWidth * 0.8
          }
          yDomain={
            scaleType === 'log' ? [yMinRangeLog, yMaxRange] : [0, yMaxRange]
          }
          xDomain={[new Date(cutoffValues.DATE), _getFinalDate()]}
          margin={{ left: 55, right: 75 }}
          onMouseLeave={() => _handleGreyMouseOut()}
        >
          <XAxis
            tickFormat={
              datesAdjusted === 'off'
                ? (d) =>
                    d.toLocaleDateString('default', {
                      month: 'short',
                      day: 'numeric'
                    })
                : (d, index) => _getDaysFromDate(d)
            }
            tickLabelAngle={-30}
          />
          <YAxis
            tickValues={
              scaleType === 'log'
                ? calculateTickValues(yMinRangeLog, yMaxRange)
                : null
            }
            tickFormat={(d) => (d < 1000 ? d : d / 1000 + 'k')}
          />
          {greyHighlight && (
            <LineSeries
              curve={'curveMonotoneX'}
              data={data[greyHighlight].data}
              color={'#aaa'}
              strokeWidth={3}
            />
          )}
          {greyHighlight && (
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
              color={'#aaa'}
            />
          )}
          {greyHighlight && (
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
                  label: data[greyHighlight].country,
                  xOffset: 12
                }
              ]}
              style={{
                fontSize: '0.8rem',
                stroke: '#ccc'
              }}
              labelAnchorX='start'
              labelAnchorY='central'
            />
          )}
          {data.map((d, index) => (
            <LineSeries
              key={index}
              curve={'curveMonotoneX'}
              data={d.data}
              color={'#ccc'}
              strokeWidth={0.6}
              onSeriesMouseOver={(e) => _handleGreyMouseOver(e, index)}
              onSeriesMouseOut={(e) => _handleGreyMouseOut()}
            />
          ))}
          {onMouseHover && (
            <Crosshair
              values={crosshairValue}
              titleFormat={(d) => ({
                title: d[0].country,
                value: d[0].x.toISOString().slice(0, 10)
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
          {selectedCountries[selectedHighlight] && (
            <LineSeries
              curve={'curveMonotoneX'}
              data={selectedCountries[selectedHighlight].data}
              color={customColor[selectedHighlight]}
              strokeWidth={4}
              onNearestXY={(d) => _handleCrosshair(d)}
            />
          )}
          {selectedCountries.map((d, index) => (
            <LineSeries
              key={index}
              curve={'curveMonotoneX'}
              data={casesType && d.data}
              color={customColor[index]}
              onSeriesMouseOver={(e) => _handleSelectedMouseOver(e, index)}
              onSeriesMouseOut={(e) => _handleSelectedMouseOut()}
            />
          ))}
          {selectedCountries.map((d, index) => (
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
          {selectedCountries.map((d, index) => (
            <LabelSeries
              key={index}
              data={[
                {
                  x: d.data[d.data.length - 1].x,
                  y: d.data[d.data.length - 1].y,
                  label: d.country,
                  xOffset: 12
                }
              ]}
              style={
                selectedHighlight == index
                  ? { fontSize: '0.85rem', stroke: '#aaa' }
                  : { fontSize: '0.85rem', stroke: '#ddd' }
              }
              labelAnchorX='start'
              labelAnchorY='central'
            />
          ))}
        </XYPlot>
        <div
          style={
            window.innerWidth > 500
              ? { marginLeft: '23.5%' }
              : { marginLeft: '13%' }
          }
          className='text-sm text-gray-600'
        >
          {datesAdjusted === 'on' ? footNote : ''}
        </div>
      </div>
    )
  }
}

export default LineChartWidget
