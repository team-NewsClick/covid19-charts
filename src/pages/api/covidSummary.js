const covidSummary = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res)
    default:
      return res.status(404).json({
        error: 'notfound',
        description: 'resource not found',
      })
  }
}

const handleGet = async (_, res) => {
  const statsSummmary = await fetch(process.env.API_URL_COVIDSUMMARY)
  .then(res => res.text())
    res.setHeader('Cache-Control', 'max-age=3600')
  return res.json(statsSummmary)
}

export default covidSummary
