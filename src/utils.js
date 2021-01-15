import { cutoffValues, CasesType } from './constants'

/**
 * Filter COVID-19 cases by caseType with a cutoff date
 * @param {Array} data - Array of Objects for COVID-19 cases
 * @param {string} caseType - Cases to Filter
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
 * @param {Array} rawData - Array of Objects for COVID-19 cases
 */
export const processLogData = (rawData) => {
  return rawData.map((rows) => {
    const regionData = rows.data.filter((row) => {
      return row.y !== '0'
    })
    return {
      region: rows.region,
      data: regionData,
    }
  })
}

/**
 * Calculate Cummulative data and return an Array of Objects
 * @param {Array} rawData - Array of Objects for COVID-19 cases
 */
export const processCumulativeData = (rawData) => {
  return rawData.map((row) => {
    let acc = 0
    const regionCases = row.data.map((d) => {
      acc = acc + parseInt(d.y)
      return {
        x: d.x,
        y: acc.toString(),
      }
    })
    return {
      region: row.region,
      data: regionCases,
    }
  })
}

/**
 * Calculate Adjusted dates and return an Array of Objects
 * @param {Array} rawData - Array of Objects for COVID-19 cases
 * @param {string} caseType - Type of Cases to Filter
 * @param {string} dataType - Type of Data (New/Cummulative)
 */
export const processDatesAdjusted = (rawData, caseType, dataType) => {
  const cutOff =
    dataType === 'new'
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
            date: d.x,
          }
        }
      })
      .filter((row) => {
        return row !== undefined
      })
    return {
      region: row.region,
      data: regionCases,
    }
  })
}

/**
 * Calculate Minimumx Values and return a number
 * @param {Array} data - Array of Objects for COVID-19 cases
 * @param {string} datesAdjusted - Dates Adjusted (ON/OFF)
 */
export const calculateXMinValue = (data, datesAdjusted) => {
  let allRegionsMin = data.map((rd) => {
    let d = rd.data
    let regionMin = d.reduce((acc, e) => {
      acc = e.x < acc ? e.x : acc
      return acc
    }, new Date('01/01/3000'))
    return regionMin
  })
  let min = allRegionsMin.reduce((acc, e) => {
    acc = e < acc ? e : acc
    return acc
  }, new Date('01/01/3000'))

  Date.prototype.subtractDays = function () {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() - min.getDate() + 1)
    return date
  }

  return datesAdjusted === 'on' ? 1 : min.subtractDays()
}

/**
 * Calculate Maximum values and return a Date Object
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
 * Return a Minimum Log value for Y axis
 * @param {Array} dataType - Array of Objects for COVID-19 cases
 * @param {string} casesType - Type of Cases to Filter
 * @param {string} datesAdjusted - Dates Adjusted (ON/OFF)
 */
export const calculateYMinValue = (dataType, casesType, datesAdjusted) => {
  const yMinRangeLog =
    datesAdjusted === 'on'
      ? casesType === 'confirmed'
        ? dataType === 'cumulative'
          ? cutoffValues.CUMMULATIVE
          : cutoffValues.CONFIRMED
        : dataType === 'cumulative'
        ? cutoffValues.CUMMULATIVE
        : cutoffValues.DEATHS
      : cutoffValues.DEFAULT
  return yMinRangeLog
}

/**
 * Calculate and Return a Maximum value for Y axis
 * @param {Array} data - Array of Objects for COVID-19 cases
 */
export const calculateYMaxValue = (data) => {
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
  return max * 1.15
}

/**
 * Return an Array of tick Values
 * @param {number} yMinRange - Minimum Y range
 * @param {number} yMaxRange - Maximum Y range
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
 */
export const indPlaceVal = (x) => {
  x = x.toString()
  let lastThree = x.substring(x.length - 3)
  let otherNumbers = x.substring(0, x.length - 3)
  if (otherNumbers != '') lastThree = ',' + lastThree
  let number = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
  return number
}

/**
 * Fetch Data using GET method
 * @param {string} url - URL to fetch
 */
export const fetcher = (url) => {
  const data = fetch(url).then((res) => res.json())
  return data
}

/**
 * Return Maximum Number from the Array
 * @param {Array} data - Array of Objects for COVID-19 cases
 * @param {string} sortBy - Cases to Sort By
 */
export const calcuateMaximum = (data, sortBy) => {
  const max = data.reduce((p, acc) => (p[sortBy] > acc[sortBy] ? p : acc))
  return max[sortBy]
}

/**
 * Return Minimum Number from the Array
 * @param {Array} data - Array of Objects for COVID-19 cases
 * @param {string} sortBy - Cases to Sort By
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
 */
export const normalizeValue = (val, max, min) => {
  return (val - min) / (max - min)
}

/**
 * Calculate and Return Normalized Domain values
 * @param {Array} data - Array of Objects for COVID-19 cases
 * @param {string} casesType - Type of cases to filter
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
 * @param {Array} colorDomains - Color Domain
 */
export const sortLegends = (maxValue, colors, colorDomains) => {
  const legends = []
  const sublegends = colorDomains.map((l, i) => {
    return {
      lowerBound: Math.round(l * maxValue),
      upperBound: Math.round(colorDomains[i + 1] * maxValue) - 1 || maxValue,
      color: `(${colors(l).join(',')})`,
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
          color: s.color,
        })
  })
  return legends
}
