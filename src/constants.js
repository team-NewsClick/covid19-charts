/**
 * Colors for Line Charts
 */
export const customColor = [
  "#015069",
  "#C71E1D",
  "#349935",
  "#774936",
  "#F29B34",
  "#8E44AD"
]

/**
 * Name of days of week
 */
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

/**
 * Name of months for x-ticks
 */
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

/**
 * Cutoff Values for Charts
 */
export const cutoffValues = {
  DATE: "03/01/2020",
  CUMMULATIVE: 100,
  CONFIRMED: 10,
  DEATHS: 3,
  DEFAULT: 1
}

/**
 * Cases Type
 */
export const CasesType = {
  CONFIRMED: "new_cases",
  DEATHS: "new_deaths",
  NEW_DOSES_ADMINISTERED: "new_doses_administered",
  TOTAL_DOSES_ADMINISTERED: "total_doses_administered",
  NEW_VACCINATED_PER_LAKH: "new_vaccinated_per_one_lakh",
  TOTAL_VACCINATED_PER_LAKH: "total_vaccinated_per_one_lakh"
}

/**
 * Default selection for Country
 */
export const DefaultSelectCountry = [
  {
    value: "India",
    label: "India"
  },
  {
    value: "United States",
    label: "United States"
  },
  {
    value: "United Kingdom",
    label: "United Kingdom"
  }
]

/**
 * Default selection for State
 */
export const DefaultSelectState = [
  {
    label: "Delhi",
    value: "Delhi"
  },
  {
    label: "Kerala",
    value: "Kerala"
  },
  {
    label: "Maharashtra",
    value: "Maharashtra"
  }
]

/**
 * Default selection for City
 */
export const DefaultSelectCity = [
  {
    value: "Delhi",
    label: "Delhi"
  },
  {
    value: "Mumbai",
    label: "Mumbai"
  },
  {
    value: "Bengaluru",
    label: "Bengaluru"
  }
]

/**
 * Color Domain for Heat Maps
 */
export const MAP_COLOR_DOMAIN = [
  [255, 255, 178],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [240, 59, 32],
  [189, 0, 38]
]

/**
 * Color Domain for the Vaccinated Heat Maps
 */
export const MAP_VACCINE_COLOR_DOMAIN = [
  [237, 248, 251],
  [204, 236, 230],
  [153, 216, 201],
  [102, 194, 164],
  [44, 162, 95],
  [0, 109, 44]
]

/**
 * Color for State Border in District Maps
 */
export const DISTRICT_STATE_BORDER_COLOR = [245, 245, 245, 255]

/**
 * Color for District Border in District Maps
 */
export const DISTRICT_BORDER_COLOR = [255, 255, 255, 125]

/**
 * Initial View State for India map
 */
export const INDIA_INITIAL_VIEW_STATE = {
  latitude: 22.7,
  longitude: 82.8,
  zoom: 4.3,
  minZoom: 4.3,
  maxZoom: 4.3,
  pitch: 0,
  bearing: 0
}

/**
 * Initial View State for World Map
 */
 export const WORLD_INITIAL_VIEW_STATE = {
  latitude: 20,
  longitude: 80,
  zoom: 3,
  minZoom: 3,
  maxZoom: 3,
  pitch: 0,
  bearing: 0
}
/**
 * Cases type for charts
 */
export const CASE_TYPE = {
  CONFIRMED: "confirmed",
  DEATHS: "deaths"
}

/**
 * Data type for charts
 */
export const DATA_TYPE = {
  NEW: "new",
  CUMULATIVE: "cumulative"
}

/**
 * Scale type for charts
 */
export const SCALE_TYPE = {
  LOG: "log",
  LINEAR: "linear"
}

/**
 * Date adjusted mode for charts
 */
export const DATE_ADJUSTED = {
  ON: "on",
  OFF: "off"
}

/**
 * Per lakh mode fro charts
 */
export const PER_LAKH = {
  ON: "on",
  OFF: "off"
}

/**
 * case type for district maps
 */
export const DIST_MAP_CASE_TYPE = {
  ACTIVE: "active",
  CONFIRMED: "confirmed",
  DECEASED: "deceased",
}

/**
 * case type for state maps
 */
export const STATE_MAP_CASE_TYPE = {
  ACTIVE: "active",
  NEW_CASES: "new_cases",
  TOTAL_CASES: "total_cases",
  NEW_DEATHS: "new_deaths",
  TOTAL_DEATHS: "total_deaths",
  TOTAL_VACCINATED_PER_THOUSAND: "total_vaccinated_per_thousand"
}

/**
 * Visualisation type of vaccination
 */
export const VACCINATION_VIZ = {
  CHART: "vaccination-chart",
  MAP: "vaccination-map"
}

/**
 * World vaccination case types
 */
export const WORLD_MAP_VACCINATION_CASE_TYPE = {
  VACCINATED: "people_vaccinated",
  FULLY_VACCINATED: "people_fully_vaccinated",
  VACCINATED_PERCENT: "people_vaccinated_per_hundred",
  FULLY_VACCINATED_PERCENT: "people_fully_vaccinated_per_hundred"
}

/**
 * GeoJSONs Path
 */
export const GEOJSON_PATH = {
  DISTRICTS: "/data/geojson/districts.geojson",
  STATES: "/data/geojson/states.geojson",
  COUNTRIES: "/data/geojson/countries.geojson"
}
