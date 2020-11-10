import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  Crosshair,
  Voronoi,
  MarkSeries,
  LabelSeries
} from 'react-vis'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useState } from 'react'

export default function LineChartWidget({ data }) {
  if (data.length == 0) {
    return <div className='m-3'>Loading...</div>
  } else {
    const animatedComponents = makeAnimated()
    const vornoiNodes = []
    const [hoveredNode, setHoveredNode] = useState(null)
    const [lineOpacity, setLineOpacity] = useState(0.3)
    const [selectedCountries, setSelectedCountries] = useState([
      {
        label: data[79].country,
        data: data[79].data
      }
    ])
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

    const countries = data.map((row) => {
      return {
        value: row.country,
        label: row.country
      }
    })
    for (let i = 0; i < selectedCountries.length; i++) {
      for (let j = 0; j < selectedCountries[i].data.length; j++) {
        vornoiNodes.push({
          x: selectedCountries[i].data[j].x,
          y: selectedCountries[i].data[j].y,
          country: selectedCountries[i].label
        })
      }
    }

    const handelchange = (e) => {
      const countires = e.map((row) => {
        const country = data.filter((d) => {
          return row.value === d.country
        })
        return country
      })
      setSelectedCountries([...selectedCountries, ...countires.flat()])
    }

    return (
      <div>
        <div className='m-4'>
          <Select
            components={animatedComponents}
            placeholder='Select a region'
            options={countries}
            onChange={handelchange}
            defaultValue={selectedCountries}
            options={countries}
            isSearchable
            isMulti
          />
        </div>

        <XYPlot
          xType='time'
          width={window.innerWidth / 1.05}
          height={window.innerWidth / 2.4}
          yDomain={[0, 100000]}
          xDomain={[new Date('03/01/2020'), new Date('11/05/2020')]}
          margin={{ left: 55, right: 70 }}
        >
          <XAxis
            tickFormat={(d) =>
              d.toLocaleDateString('default', {
                month: 'short',
                day: 'numeric'
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
              opacity={
                hoveredNode && hoveredNode.country === d.label ? 1 : 0.35
              }
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
              opacity={
                hoveredNode && hoveredNode.country === d.label ? 1 : 0.35
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
                  label: d.label,
                  xOffset: 12
                }
              ]}
              style={{
                fontSize: '0.8rem'
              }}
              labelAnchorX='start'
              labelAnchorY='central'
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
              value: d[0].x.toISOString().slice(0, 10)
            })}
            itemsFormat={(d) => [{ title: 'Active Cases', data: d[0].y }]}
          />
        </XYPlot>
      </div>
    )
  }
}
