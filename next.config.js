const path = require("path")

module.exports = {
  target: "serverless",
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "src")
    return config
  },
  env: {
    API_URL_COUNTRY: process.env.API_URL_COUNTRY,
    API_URL_STATE: process.env.API_URL_STATE,
    API_URL_CITY: process.env.API_URL_CITY,
    API_URL_STATE_VACCINES: process.env.API_URL_STATE_VACCINES,
    API_URL_COVIDSUMMARY: process.env.API_URL_COVIDSUMMARY,
    API_URL_GLOBAL_JSON_VACCINATIONS: process.env.API_URL_GLOBAL_JSON_VACCINATIONS,
    API_URL_STATES_GEOJSON: process.env.API_URL_STATES_GEOJSON,
    API_URL_DISTRICTS_GEOJSON: process.env.API_URL_DISTRICTS_GEOJSON,
    API_URL_STATE_COVID_JSON: process.env.API_URL_STATE_COVID_JSON,
    API_URL_DISTRICT_COVID_JSON: process.env.API_URL_DISTRICT_COVID_JSON,
    API_URL_DATAWRAPPER: process.env.API_URL_DATAWRAPPER,
    MAPBOX_BOX_ACCESS_TOKEN: process.env.MAPBOX_BOX_ACCESS_TOKEN
  }
}
