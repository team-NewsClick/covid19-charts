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

export const processDatesAdjusted = (rawData, caseType) => {
  const cuttOff = caseType === 'new_deaths' ? 3 : 10
  return rawData.map((row) => {
    let countryCases = row.data.map((d) => {
      if (parseInt(d.y) >= cuttOff) {
        return {
          x: d.x,
          y: d.y
        }
      }
    }).filter((row) => {
      return row !== undefined
    })
    return {
      country: row.country,
      data: countryCases
    }
  })
}