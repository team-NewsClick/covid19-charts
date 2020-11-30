export const filterCases = (data, caseType) => {
  const cutoffDate = new Date('03/01/2020')
  return data.reduce((result, row) => {
    const date = new Date(row.date)
    if (date < cutoffDate) return result
    const found = result.find((a) => a.country === row.country)
    const value = { x: new Date(row.date), y: row[caseType] }
    if (!found) {
      result.push({ country: row.country, data: [value] })
    } else {
      found.data.push(value)
    }
    return result
  }, [])
}

export const processLogData = (rawData) => {
  return rawData.map((rows) => {
    const countryData = rows.data.filter((row) => {
      return row.y !== '0'
    })
    return {
      country: rows.country,
      data: countryData
    }
  })
}

export const processCumulativeData = (rawData) => {
  return rawData.map((row) => {
    let acc = 0
    const countryCases = row.data.map((d) => {
      acc = acc + parseInt(d.y)
      return {
        x: d.x,
        y: acc.toString()
      }
    })
    return {
      country: row.country,
      data: countryCases
    }
  })
}

export const processDatesAdjusted = (rawData, caseType, dataType) => {
  const cutOff = dataType === 'new' ? (caseType === 'new_deaths' ? 3 : 10) : 100
  return rawData.map((row) => {
    let countryCases = row.data
      .map((d) => {
        if (parseInt(d.y) >= cutOff) {
          return {
            x: d.x,
            y: d.y
          }
        }
      })
      .filter((row) => {
        return row !== undefined
      })
    return {
      country: row.country,
      data: countryCases
    }
  })
}

export const calculateMinValue = (dataType, casesType, datesAdjusted) => {
  const yMinRangeLog =
    datesAdjusted === 'on'
      ? casesType === 'confirmed'
        ? dataType === 'cumulative'
          ? 100
          : 10
        : dataType === 'cumulative'
        ? 100
        : 3
      : 1
  return yMinRangeLog
}

export const calculateMaxValue = (data) => {
  const selectedCountry = data.filter((row) => {
    if (row.country === 'US') {
      return row.data
    }
  })
  const yMax = Math.max.apply(
    Math,
    selectedCountry[0].data.map((d) => {
      return d.y
    })
  )
  const max = Math.ceil(yMax / 3000) * 3000
  return max
}

export const calculateTickValues = (yMinRange, yMaxRange) => {
  const tickValues = []
  for (let i = yMinRange; i <= yMaxRange; i = i * 10) {
    tickValues.push(i)
    tickValues.push(2 * i)
    tickValues.push(5 * i)
  }
  return tickValues
}
