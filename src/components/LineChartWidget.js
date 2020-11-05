import React, { useState } from "react";
import Select from "react-select";
import {
  XYPlot,
  LineSeries,
  Crosshair,
  MarkSeries,
  LabelSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import makeAnimated from "react-select/animated";

export default function LineChartWidget({ covidData }) {
  console.log(covidData)
  return <p>Hello</p>
  // const [crosshair, setCrosshair] = useState([]);
  // const [multiRegions, setMultiRegions] = useState([
  //   { value: "144", label: "India" },
  // ]);

  // const regions = [];
  // const dataIndia = [];
  // const customColor = [
  //   "#1abc9c",
  //   "#f1c40f",
  //   "#2ecc71",
  //   "#e67e22",
  //   "#3498db",
  //   "#9b59b6",
  //   "#34495e",
  //   "#16a085",
  //   "#f39c12",
  //   "#27ae60",
  //   "#d35400",
  //   "#2980b9",
  //   "#8e44ad",
  //   "#2c3e50",
  // ];

  // if (covidData.length == 0) {
  //   return <div>Loading...</div>;
  // } else {
  //   let j = 0;
  //   for (let i = 0; i < 267; i++) {
  //     if (covidData.data[i].province !== "") {
  //       regions.push({ value: i + 1, label: covidData.data[i].province });
  //     } else {
  //       regions.push({ value: i + 1, label: covidData.data[i].country });
  //     }
  //   }
  // }

  // const selectedRegionsData = [];
  // const _confirmedCases = (v) => {
  //   const confirmedCases = [];
  //   let j = 0;
  //   for (let i = 0; i < covidData.data.length; i++) {
  //     if (covidData.data[i].country == v) {
  //       confirmedCases.push({ x: ++j, y: covidData.data[i].total_confirmed });
  //     }
  //   }
  //   selectedRegionsData.push(confirmedCases);
  //   return confirmedCases;
  // };

  // const _onMouseLeave = () => {
  //   setCrosshair([]);
  // };

  // const _onNearestX = (value, { index }) => {
  //   setCrosshair(selectedRegionsData.map((d) => d[index]));
  // };

  // const _dayDate = (e) => {
  //   const startingDate = new Date("January 22, 2020");
  //   var dmy = new Date(startingDate.setDate(startingDate.getDate() + e - 1));
  //   var yyyy = dmy.getFullYear();
  //   var dd = dmy.getDate();
  //   var mm = dmy.getMonth() + 1;
  //   return dd + "/" + mm + "/" + yyyy;
  // };

  // const data = dataIndia;

  // return (
  //   <div>
  //     <p>
  //       Starting 22nd Jan 2020 as day 1 on x-axis and total number of confirmed
  //       cases on y-axis, where 'M' stands for million.
  //     </p>
  //     <div style={{ width: 1300 }}>
  //       <Select
  //         components={makeAnimated()}
  //         options={regions}
  //         placeholder="Select a region"
  //         onChange={setMultiRegions}
  //         isSearchable
  //         isMulti
  //         autoFocus
  //       />
  //     </div>
  //     <XYPlot
  //       height={500}
  //       width={1100}
  //       onMouseLeave={_onMouseLeave}
  //       margin={{ left: 80, right: 160 }}
  //     >
  //       <VerticalGridLines />
  //       <HorizontalGridLines />
  //       <XAxis
  //         tickTotal="10"
  //         tickLabelAngle={-30}
  //         tickFormat={(value) => {
  //           return _dayDate(value);
  //         }}
  //       />
  //       <YAxis
  //         tickFormat={(value) => {
  //           return value / 1000000 + "M";
  //         }}
  //       />
  //       {multiRegions.map(({ value, label }, index) => (
  //         <LineSeries
  //           key={value}
  //           data={_confirmedCases(label)}
  //           onNearestX={_onNearestX}
  //           color={customColor[index]}
  //         />
  //       ))}
  //       <Crosshair
  //         values={crosshair}
  //         titleFormat={(d) => ({
  //           title: "Day " + d[0].x,
  //           value: _dayDate(d[0].x),
  //         })}
  //         itemsFormat={(d) =>
  //           multiRegions.map((e) => ({
  //             title: e.label,
  //             value: d[multiRegions.indexOf(e)].y,
  //           }))
  //         }
  //       />
  //       {multiRegions.map(({ value, label }, index) => (
  //         <MarkSeries
  //           key={value}
  //           strokeWidth={2}
  //           data={[
  //             {
  //               x: (covidData.data.length - 1) / 267,
  //               y:
  //                 covidData.data[covidData.data.length - 1 - (267 - value + 1)]
  //                   .total_confirmed,
  //               label: label,
  //             },
  //           ]}
  //           color={customColor[index]}
  //         />
  //       ))}
  //       {multiRegions.map(({ value, label }) => (
  //         <LabelSeries
  //           key={value}
  //           data={[
  //             {
  //               x: (covidData.data.length - 1) / 267,
  //               y:
  //                 covidData.data[covidData.data.length - 1 - (267 - value + 1)]
  //                   .total_confirmed,
  //               label: label,
  //               xOffset: 12,
  //             },
  //           ]}
  //           style={{ paddingLeft: "100%", fontSize: "14px", marginLeft: "50" }}
  //           labelAnchorX="start"
  //           labelAnchorY="central"
  //           xOffset="10"
  //         />
  //       ))}
  //     </XYPlot>
  //   </div>
  // );
}
