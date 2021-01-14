import { csvParse } from "d3-dsv"

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
  const stateData = await fetch(process.env.API_URL_STATE)
    .then((res) => res.text())
    .then(csvParse)
  res.setHeader("Cache-Control", "max-age=3600")
  return res.json(stateData)
}

export default handler
