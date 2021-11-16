import { cutoffValues, CasesType } from "./constants"

/**
 * To find region the highest new confirmed cases
 * @param {Array<Object>} data List of regions and their respective new confirmed cases data
 * @returns {Array<Object>} - Three regions with highest new confirmed cases
 */
export const getDefaultSelects = (data, casesType) => {
  let newConfirmedCases = filterCases(data, casesType)
  const lastDayData = []
  let sorted = []
  let defaultRegions = []
  newConfirmedCases.length > 0 &&
    newConfirmedCases.map((d) => {
      lastDayData.push({
        region: d.region,
        y: parseInt(d.data[d.data.length - 1].y)
      })
    })
  sorted = lastDayData.sort((a, b) => (a.y < b.y ? 1 : a.y > b.y ? -1 : 0))
  for (let i = 0; i < 3; i++) {
    defaultRegions.push({
      value: sorted[i].region,
      label: sorted[i].region
    })
  }
  return defaultRegions
}

/**
 * Filter COVID-19 cases by caseType with a cutoff date
 * @param {Array.<Object>} data - Array of Objects for COVID-19 cases
 * @param {string} caseType - Cases to Filter
 * @return {Array.<Object>} Filtered COVID-19 cases by caseType with a cutoff date
 */
export const filterCases = (data, caseType) => {
  const cutoffDate = new Date(cutoffValues.DATE)
  return data.reduce((result, row) => {
    const date = new Date(row.date)
    if (date < cutoffDate) return result
    const found = result.find((a) => a.region === row.region)
    const value = { x: new Date(row.date), y: row[caseType] }
    if (!found) {
      result.push({ region: row.region, data: [value] })
    } else {
      found.data.push(value)
    }
    return result
  }, [])
}

/**
 * Remove '0' from the COVID-19 Dataset and return and Array of Objects
 * @param {Array.<Object>} rawData - Array of Objects for COVID-19 cases
 * @return {Array.<Object>} COVID-19 Dataset with all '0'(s) removed
 */
export const processLogData = (rawData) => {
  return rawData.map((rows) => {
    const regionData = rows.data.filter((row) => {
      return row.y !== "0"
    })
    return {
      region: rows.region,
      data: regionData
    }
  })
}

/**
 * Calculate Cummulative data and return an Array of Objects
 * @param {Array.<Object>} rawData - Array of Objects for COVID-19 cases
 * @return {Array.<Object>} An Array of Objects with calculated Cumulative Data
 */
export const processCumulativeData = (rawData) => {
  return rawData.map((row) => {
    let acc = 0
    const regionCases = row.data.map((d) => {
      acc = acc + parseInt(d.y)
      return {
        x: d.x,
        y: acc.toString()
      }
    })
    return {
      region: row.region,
      data: regionCases
    }
  })
}

/**
 * Calculate Adjusted dates and return an Array of Objects
 * @param {Array.<Object>} rawData - Array of Objects for COVID-19 cases
 * @param {string} caseType - Type of Cases to Filter
 * @param {string} dataType - Type of Data (New/Cummulative)
 * @return {Array.<Object>} Dataset with Number of Days from the date of outbreak
 */
export const processDatesAdjusted = (rawData, caseType, dataType) => {
  const cutOff =
    dataType === "new"
      ? caseType === CasesType.DEATHS
        ? cutoffValues.DEATHS
        : cutoffValues.CONFIRMED
      : cutoffValues.CUMMULATIVE
  return rawData.map((row) => {
    let temp = 0
    let regionCases = row.data
      .map((d) => {
        if (parseInt(d.y) >= cutOff) {
          return {
            x: ++temp,
            y: d.y,
            date: d.x
          }
        }
      })
      .filter((row) => {
        return row !== undefined
      })
    return {
      region: row.region,
      data: regionCases
    }
  })
}

/**
 * Calculate Minimum x Values and return a number
 * @param {Array.<Object>} data - Array of Objects for COVID-19 cases
 * @param {string} datesAdjusted - Dates Adjusted (ON/OFF)
 * @return Origin for x-axis as Date or Day
 */
export const calculateXMinValue = (data, datesAdjusted) => {
  let allRegionsMin = data.map((rd) => {
    let d = rd.data
    let regionMin = d.reduce((acc, e) => {
      acc = e.x < acc ? e.x : acc
      return acc
    }, new Date("01/01/3000"))
    return regionMin
  })
  let min = allRegionsMin.reduce((acc, e) => {
    acc = e < acc ? e : acc
    return acc
  }, new Date("01/01/3000"))

  Date.prototype.subtractDays = function () {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() - min.getDate() + 1)
    return date
  }
  return datesAdjusted === "on" ? 1 : min.subtractDays()
}

/**
 * Calculate Maximum values and return a Date Object
 * @return {Date} Vertex for x-axis
 */
export const calculateXMaxValue = () => {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  const d = new Date()
  return d.addDays(2)
}

/**
 * Return a Minimum value for Y axis
 * @param {Array.<Object>} dataType - Array of Objects for COVID-19 cases
 * @param {string} casesType - Type of Cases to Filter
 * @param {string} datesAdjusted - Dates Adjusted (ON/OFF)
 * @return {number} Origin for y-axis
 */
export const calculateYMinValue = (dataType, casesType, datesAdjusted) => {
  const yMinRangeLog =
    datesAdjusted === "on"
      ? casesType === "confirmed"
        ? dataType === "cumulative"
          ? cutoffValues.CUMMULATIVE
          : cutoffValues.CONFIRMED
        : dataType === "cumulative"
        ? cutoffValues.CUMMULATIVE
        : cutoffValues.DEATHS
      : cutoffValues.DEFAULT
  return yMinRangeLog
}

/**
 * Calculate and Return a Maximum value for Y axis
 * @param {Array.<Object>} data - Array of Objects for COVID-19 cases
 * @return {number} Vertex for y-axis
 */
export const calculateYMaxValue = (data, scaleType) => {
  let allRegionsMax = data.map((rd) => {
    let d = rd.data
    let regionMax = d.reduce((acc, e) => {
      acc = parseInt(e.y) > acc ? e.y : acc
      return acc
    }, 0)
    return regionMax
  })
  let max = allRegionsMax.reduce((acc, e) => {
    acc = parseInt(e) > acc ? e : acc
    return acc
  }, 0)
  return scaleType === "linear" ? max * 1.15 : max * 2
}

/**
 * Return an Array of tick Values for y-axis in case of log data-type
 * @param {number} yMinRange - Minimum Y range
 * @param {number} yMaxRange - Maximum Y range
 * @return {Array.<number>} Tick Values for y-axis
 */
export const calculateYTickValues = (yMinRange, yMaxRange) => {
  const tickValues = []
  for (let i = yMinRange; i <= yMaxRange; i = i * 10) {
    tickValues.push(i)
    tickValues.push(2 * i)
    tickValues.push(5 * i)
  }
  return tickValues
}

/**
 * Convert Number to Indian Decimal System
 * @param {number} x - Number to convert to Indian System
 * @return {number} Number in Indian Place Value System
 */
export const indPlaceVal = (x) => {
  if(x !== null) {
    x = x.toString()
    let lastThree = x.substring(x.length - 3)
    let otherNumbers = x.substring(0, x.length - 3)
    if (otherNumbers != "") lastThree = "," + lastThree
    let number = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree
    return number
  }
}

/**
 * Fetch Data using GET method
 * @param {string} url - URL to fetch
 * @return {Object} Fetched data as json
 */
export const fetcher = (url) => {
  const data = fetch(url).then((res) => res.json())
  return data
}

/**
 * Return Maximum Number from the Array
 * @param {Array.<Object>} data - Array of Objects for COVID-19 cases
 * @param {string} sortBy - Cases to Sort By
 * @return {number} Maximum Value from the dataset
 */
export const calcuateMaximum = (data, sortBy) => {
  const max = data.reduce((p, acc) => (p[sortBy] > acc[sortBy] ? p : acc))
  return max[sortBy]
}

/**
 * Return Minimum Number from the Array
 * @param {Array.<Object>} data - Array of Objects for COVID-19 cases
 * @param {string} sortBy - Cases to Sort By
 * @return {number} Minimum Value from the dataset
 */
export const calcuateMinimum = (data, sortBy) => {
  const min = data.reduce((p, acc) => (p[sortBy] < acc[sortBy] ? p : acc))
  return min[sortBy]
}

/**
 * Calculate and Return Normalized value for a number
 * @param {number} val - Value to Normalize
 * @param {number} max - Maximum Number from the array
 * @param {number} min - Minimum Number from the array
 * @return {number} Normalized value
 */
export const normalizeValue = (val, max, min) => {
  return (val - min) / (max - min)
}

/**
 * Calculate and Return Normalized Domain values
 * @param {Array.<Object>} data - Array of Objects for COVID-19 cases
 * @param {string} casesType - Type of cases to filter
 * @return {Array.<number>} Normalized Domain Values
 */
export const calculateDomain = (data, casesType) => {
  const max = calcuateMaximum(data, casesType)
  const min = calcuateMinimum(data, casesType)
  const domain = data.map((row) => {
    return normalizeValue(row[casesType], max, min)
  })
  const uniqueDomain = [...new Set(domain)]
  return uniqueDomain
}

/**
 * Calculate and Retrun Legends from color domain
 * @param {number} maxValue - Maximum Value in the domain
 * @param {Array} colors - Colors
 * @param {Array.<number>} colorDomains - Color Domain Normalized Values
 * @return {Array.<Object>} Legends as Lower Bound and Upper Bound with respective Color Domains
 */
export const sortLegends = (maxValue, colors, colorDomains) => {
  const legends = []
  const sublegends = colorDomains.map((l, i) => {
    return {
      lowerBound: Math.round(l * maxValue),
      upperBound: Math.round(colorDomains[i + 1] * maxValue) - 1,
      color: `(${colors(l).join(",")})`
    }
  })
  sublegends.map((s) => {
    let temp = legends.findIndex((e) => e.color == s.color)
    temp == -1
      ? legends.push(s)
      : (legends[temp] = {
          lowerBound:
            s.lowerBound < legends[temp].lowerBound
              ? s.lowerBound
              : legends[temp].lowerBound,
          upperBound:
            s.upperBound > legends[temp].upperBound
              ? s.upperBound
              : legends[temp].upperBound,
          color: s.color
        })
  })
  legends[0].lowerBound = 1
  legends[legends.length - 1].upperBound = maxValue
  return legends
}

/**
 * To check whether a data point is near by other points of the array
 * @param {Object} data - Coordinte
 * @param {Array<Object>} adjustedLabelSeries - Selected Countries Data
 * @param {Integer} yMax - Maximum Value of y-axis
 * @param {String} scaleType - Log or Linear
 * @return {Object} - A data point which is not nearby other points in the array
 */
export const isNearBy = (data, adjustedLabelSeries, yMax, scaleType) => {
  let doRecurssion = false
  let adjustedPoints_Y = []

  if (adjustedLabelSeries.length === 0) {
    return { x: data.x, y: data.y, region: data.region, index: data.index }
  } else {
    if (scaleType === "linear") {
      const interferenceY = window.innerWidth > 400 ? 0.014 : 0.016
      const maxRange = yMax * interferenceY + parseInt(data.y)
      const minRange = Math.abs(yMax * interferenceY - parseInt(data.y))
      adjustedPoints_Y = adjustedLabelSeries.map((row) => {
        let diff = (parseInt(row.y) - minRange) / (parseInt(row.y) - maxRange)
        if (diff <= 0) {
          doRecurssion = true
          return parseInt(data.y) + 0.4 * yMax * interferenceY
        } else if (diff == 1) {
          doRecurssion = true
          return parseInt(data.y) + 1.5 * yMax * interferenceY
        } else {
          return parseInt(data.y)
        }
      })
    } else {
      const interferenceY = parseInt(data.y) * 0.2
      const maxRange = parseInt(data.y) + interferenceY
      const minRange = Math.abs(parseInt(data.y) - interferenceY)
      adjustedPoints_Y = adjustedLabelSeries.map((row) => {
        let diff = (parseInt(row.y) - minRange) / (parseInt(row.y) - maxRange)
        if (diff < 0) {
          doRecurssion = true
          return parseInt(data.y) + 0.8 * interferenceY
        } else {
          return parseInt(data.y)
        }
      })
    }
    let sortedTempArray = adjustedPoints_Y.sort((a, b) => a - b).reverse()
    if (doRecurssion === false) {
      return {
        x: data.x,
        y: sortedTempArray[0],
        region: data.region,
        index: data.index
      }
    } else {
      return isNearBy(
        {
          x: data.x,
          y: sortedTempArray[0],
          region: data.region,
          index: data.index
        },
        adjustedLabelSeries,
        yMax,
        scaleType
      )
    }
  }
}

/**
 * Calculate Inital view state of map
 * @param {Number} windowWidth size of window innerwidth
 * @param {Object} initialViewState Inital View State of map
 * @returns {Object} Inital View State of Map
 */
export const getInitalViewStateByWidth = (windowWidth, initialViewState) => {
  return windowWidth < 700
    ? windowWidth > 500
      ? {
          ...initialViewState,
          zoom: 3.5,
          minZoom: 2.8,
          maxZoom: 4.3
        }
      : {
          ...initialViewState,
          zoom: 2.9,
          minZoom: 2.5,
          maxZoom: 3.5
        }
    : {
        ...initialViewState,
        zoom: 4.1,
        minZoom: 3.5,
        maxZoom: 5.5
      }
}

/**
 * return width size for map
 * @param {Number} windowWidth window inner width
 * @returns {Number} width size for map
 */
export const getMapWidth = (windowWidth) => {
  return windowWidth > 800 ? windowWidth * 0.4 : windowWidth * 0.95
}

/**
 * return height size for map
 * @param {Number} windowWidth window inner width
 * @returns {Number} height size for map
 */
export const getMapHeight = (windowWidth) => {
  return windowWidth > 800 ? windowWidth * 0.45 : windowWidth * 1.15
}
