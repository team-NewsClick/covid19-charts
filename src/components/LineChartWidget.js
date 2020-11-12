import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  Voronoi,
  MarkSeries,
  LabelSeries,
} from 'react-vis'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useState } from 'react'

export default function LineChartWidget(props) {
  const data = props.data.data
  const lineLabel = props.data.lineLabel
  const lineHeading = props.data.lineHeading

  if (data.length == 0) {
    return (
      <div>
        <h2 className="text-xlfont-semibold m-3 leading-7">{lineHeading}</h2>
        <div className="m-3">Loading...</div>
      </div>
    )
  } else {
    const animatedComponents = makeAnimated()
    const vornoiNodes = []
    const [hoveredNode, setHoveredNode] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState([])
    const [initBool, setInitBool] = useState(true)
    const defaultCountry = {
      value: 'India',
      label: 'India',
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
      '#2c3e50',
    ]

    if (initBool) {
      setInitBool(false)
      const country = data.filter((d) => {
        return defaultCountry.value === d.country
      })
      const setCountry = [
        {
          label: country[0].country,
          country: country[0].country,
          data: country[0].data,
        },
      ]
      setSelectedCountries([...selectedCountries, ...setCountry])
    }

    const getFinalDate = () => {
      const selectedObject = data[0]
      const dateObject = selectedObject.data[
        selectedObject.data.length - 1
      ].x.toLocaleDateString('en-US')
      return new Date(dateObject)
    }

    const countries = data.map((row) => {
      return {
        value: row.country,
        label: row.country,
      }
    })

    for (let i = 0; i < selectedCountries.length; i++) {
      for (let j = 0; j < selectedCountries[i].data.length; j++) {
        vornoiNodes.push({
          x: selectedCountries[i].data[j].x,
          y: selectedCountries[i].data[j].y,
          country: selectedCountries[i].country,
        })
      }
    }

    const handleSelectChange = (e) => {
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

    return (
      <div>
        <h2 className="text-xl font-semibold m-3 leading-7">{lineHeading}</h2>
        <div className="m-4">
          <Select
            components={animatedComponents}
            placeholder="Select a region"
            name="selectCountries"
            options={countries}
            onChange={handleSelectChange}
            defaultValue={defaultCountry}
            options={countries}
            isSearchable
            isMulti
          />
        </div>
        <div>
          <XYPlot
            xType="time"
            width={(window.innerWidth > 500) ? (window.innerWidth * 0.5) : (window.innerWidth*1.45)}
            height={(window.innerWidth > 500) ? (window.innerWidth * 0.25) : (window.innerWidth*0.8)}
            yDomain={[0, 150000]}
            xDomain={[new Date('03/01/2020'), getFinalDate()]}
            margin={{ left: 55, right: 75 }}
          >
            <XAxis
              tickFormat={(d) =>
                d.toLocaleDateString('default', {
                  month: 'short',
                  day: 'numeric',
                })
              }
              tickLabelAngle={-30}
            />
            <YAxis tickFormat={(v) => v / 1000 + 'k'} />

            {selectedCountries.map((d, index) => (
              <LineSeries
                key={index}
                curve={'curveMonotoneX'}
                data={d.data}
                color={customColor[index]}
                strokeWidth={
                  hoveredNode && hoveredNode.country === d.country ? 4 : 1.5
                }
                opacity={0.6}
              />
            ))}

            {selectedCountries.map((d, index) => (
              <MarkSeries
                key={index}
                data={[
                  {
                    x: d.data[d.data.length - 1].x,
                    y: d.data[d.data.length - 1].y,
                  },
                ]}
                color={customColor[index]}
                opacity={
                  hoveredNode && hoveredNode.country === d.country ? 4 : 2.0
                }
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
                    xOffset: 12,
                  },
                ]}
                style={
                  hoveredNode && hoveredNode.country === d.country
                    ? {
                        fontSize: '0.85rem',
                        stroke: '#494949',
                      }
                    : {
                        fontSize: '0.85rem',
                        stroke: '#bbb',
                      }
                }
                labelAnchorX="start"
                labelAnchorY="central"
              />
            ))}

            {hoveredNode && (
              <MarkSeries
                data={[hoveredNode]}
                color={'#333'}
                stroke={'#fff'}
                strokeWidth={2}
              />
            )}
            <Voronoi
              nodes={vornoiNodes}
              onHover={(node) => setHoveredNode(node)}
              onBlur={() => setHoveredNode(null)}
            />

            <Crosshair
              values={[hoveredNode]}
              titleFormat={(d) => ({
                title: d[0].country,
                value: d[0].x.toISOString().slice(0, 10),
              })}
              itemsFormat={() => [
                { title: `${lineLabel}`, value: hoveredNode.y },
              ]}
            />
          </XYPlot>
        </div>
      </div>
    )
  }
}
