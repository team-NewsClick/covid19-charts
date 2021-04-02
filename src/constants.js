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
  TOTAL_VACCINATED_PER_THOUSAND: "total_vaccinated_per_thousand"
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
