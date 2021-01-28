import useSWR from "swr"
import LoaderFunction from "../LoaderFunction"
import { indPlaceVal } from "../../utils"
import { days, months } from "../../constants"

/**
 * Article's Introduction in Summary to be used in Article's Thumbnail and also as first paragraph in the article
 * @component
 * @return {JSX.Element} Article's Introduction in Summary
 */
const IntroductionThumbnail = () => {
  const { data, error } = useSWR("/api/covidSummary")
  const statsSummary = data
  if (error) return <div>Failed to Load</div>
  if (!data) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  }
  return (
    <div className="article-para">
      The total confirmed Covid-19 cases in India reached{" "}
      {indPlaceVal(statsSummary.indiaTotalConfirmed)} on{" "}
      {new Date().getDay() - 1 >= 0 ? days[new Date().getDay() - 1] : "Sunday"},{" "}
      {new Date().getDate() - 1}{" "}
      {months[parseInt(statsSummary.timestamp.slice(3, 5)) - 1]}{" "}
      {statsSummary.timestamp.slice(6, 10)}. In the past 24 hours,{" "}
      {indPlaceVal(statsSummary.indiaNewConfirmed)} new cases were reported,
      accounting for about{" "}
      {(
        (statsSummary.indiaNewDeaths / statsSummary.worldNewDeaths) *
        100
      ).toFixed(2)}
      % of the new cases reported globally since yesterday. The total number of
      deaths have reached {indPlaceVal(statsSummary.indiaTotalDeaths)} with{" "}
      {indPlaceVal(statsSummary.indiaNewDeaths)} deaths reported in the past 24
      hours. The number of patients who have recovered since yesterday is{" "}
      {indPlaceVal(statsSummary.indiaNewRecovery)} and the total active cases in
      the country at present stand at{" "}
      {indPlaceVal(statsSummary.indiaTotalActive)}.
    </div>
  )
}

export default IntroductionThumbnail
