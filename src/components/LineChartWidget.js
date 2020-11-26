import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  MarkSeries,
  LabelSeries
} from 'react-vis'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useState } from 'react'

const LineChartWidget = (props) => {
  const data = props.data.data
  const lineLabel = props.data.lineLabel
  const lineHeading = props.data.lineHeading
  const scaleType = props.data.scaleType
  const datesAdjusted = props.data.datesAdjusted

  const [selectedCountries, setSelectedCountries] = useState([])
  const [initBool, setInitBool] = useState(true)
  const [greyHighlight, setGreyHighlight] = useState(null)
  const [selectedHighlight, setSelectedHighlight] = useState(null)
  const [crosshairValue, setCrosshairValue] = useState(null)
  const [onMouseHover, setOnMouseHover] = useState(false)

  const animatedComponents = makeAnimated()
  const yMaxRangeLogNewCases = 1000000
  const yMaxRangeLinearNewCases = 160000
  const tickValuesNewCases = []
  const defaultCountry = {
    value: 'India',
    label: 'India'
  }
  const customColor = [
    '#1abc9c',
    '#f1c40f',
    '#2ecc71',
    '#e67e22',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#f39c12',
    '#27ae60',
    '#d35400',
    '#2980b9',
    '#8e44ad',
    '#2c3e50'
  ]

  if (data.length == 0) {
    return (
      <div>
        <h2 className='text-xl font-semibold m-3 leading-7'>{lineHeading}</h2>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    if (initBool) {
      setInitBool(false)
      const country = data.filter((d) => {
        return defaultCountry.value === d.country
      })
      const setCountry = [
        {
          label: country[0].country,
          country: country[0].country,
          data: country[0].data
        }
      ]
      setSelectedCountries([...selectedCountries, ...setCountry])
    }

    const countries = data.map((row) => {
      return {
        value: row.country,
        label: row.country
      }
    })

    for (let i = 1; i <= yMaxRangeLogNewCases; i = i * 10) {
      tickValuesNewCases.push(i)
      tickValuesNewCases.push(2 * i)
      tickValuesNewCases.push(5 * i)
    }
    
    const _getFinalDate = () => {
      const selectedObject = data[0]
      const dateObject = selectedObject.data[
        selectedObject.data.length - 1
      ].x.toLocaleDateString('en-US')
      return new Date(dateObject)
    }
    const _getDaysFromDate = (date) => {
      const firstDate = new Date('03/01/2020')
      const diff =
        (date.getTime() - firstDate.getTime()) / (1000 * 3600 * 24) + 1
      return diff
    }
    const _handleSelectChange = (e) => {
      if (e && e.length > 0) {
        const countires = e.map((row) => {
          const country = data.filter((d) => {
            return row.value === d.country
          })
          return country
        })
        setSelectedCountries([...countires.flat()])
      } else {
        setSelectedCountries([])
      }
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
        <h2 className='text-xl font-semibold m-3 leading-7'>{lineHeading}</h2>
        <div className='m-4'>
          <Select
            components={animatedComponents}
            placeholder='Select a region'
            name='selectCountries'
            options={countries}
            onChange={_handleSelectChange}
            defaultValue={defaultCountry}
            options={countries}
            isSearchable
            isMulti
          />
        </div>
        <XYPlot
          xType='time'
          yType={scaleType}
          width={
            window.innerWidth > 500
              ? window.innerWidth * 0.5
              : window.innerWidth * 1.45
          }
          height={
            window.innerWidth > 500
              ? window.innerWidth * 0.25
              : window.innerWidth * 0.8
          }
          yDomain={
            scaleType === 'log'
              ? [1, yMaxRangeLogNewCases]
              : [0, yMaxRangeLinearNewCases]
          }
          xDomain={[new Date('03/01/2020'), _getFinalDate()]}
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
            tickValues={scaleType === 'log' ? tickValuesNewCases : null}
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
          {selectedCountries[selectedHighlight] && (
            <LineSeries
              curve={'curveMonotoneX'}
              data={selectedCountries[selectedHighlight].data}
              color={customColor[selectedHighlight]}
              strokeWidth={4}
              onNearestXY={(d) => _handleCrosshair(d)}
            />
          )}
          {onMouseHover && crosshairValue && (
            <MarkSeries
              data={[{ x: crosshairValue[0].x, y: crosshairValue[0].y }]}
              color={'#000'}
            />
          )}
          {selectedCountries.map((d, index) => (
            <LineSeries
              key={index}
              curve={'curveMonotoneX'}
              data={d.data}
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
              data={
                selectedCountries
                  ? [
                      {
                        x: d.data[d.data.length - 1].x,
                        y: d.data[d.data.length - 1].y,
                        label: d.country,
                        xOffset: 12
                      }
                    ]
                  : []
              }
              style={{ fontSize: '0.85rem', stroke: '#ddd' }}
              labelAnchorX='start'
              labelAnchorY='central'
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
        </XYPlot>
      </div>
    )
  }
}

export default LineChartWidget
