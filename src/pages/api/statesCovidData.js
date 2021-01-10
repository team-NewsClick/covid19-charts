const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res)
    default:
      return res.status(404).json({
        error: "not_found",
        description: "resource not found"
      })
  }
}
const handleGet = async (_, res) => {
  const covidData = await fetch(
    process.env.API_URL_STATE_COVID_JSON
  ).then((res) => res.json())
  res.setHeader("Cache-Control", "max-age=36000")
  return res.json(covidData)
}

export default handler
