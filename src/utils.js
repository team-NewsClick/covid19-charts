import { cutoffValues, CasesType } from './constants'

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

export const calculateXMaxValue = () => {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  const d = new Date()
  return d.addDays(2)
}

export const calculateXMinValue = () => {
  return new Date(cutoffValues.DATE)
}

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

export const calculateYTickValues = (yMinRange, yMaxRange) => {
  const tickValues = []
  for (let i = yMinRange; i <= yMaxRange; i = i * 10) {
    tickValues.push(i)
    tickValues.push(2 * i)
    tickValues.push(5 * i)
  }
  return tickValues
}
