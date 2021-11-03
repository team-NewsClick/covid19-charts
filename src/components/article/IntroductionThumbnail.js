import useSWR from "swr"
import { indPlaceVal } from "../../utils"
import { months } from "../../constants"
import Loading from "../helpers/Loading"
import React from "react"

/**
 * Article's Introduction in Summary to be used in Article's Thumbnail and also as first paragraph in the article
 * @component
 * @return {JSX.Element} Article's Introduction in Summary
 */
const IntroductionThumbnail = ({covidSummary}) => {

  if(covidSummary !== undefined) {
    return (
      <div className="article-para">
        The total confirmed Covid-19 cases in India reached{" "}
        {indPlaceVal(covidSummary.indiaTotalConfirmed)} on{" "}
        {covidSummary.timestamp.slice(8,10)}&nbsp;
        {months[covidSummary.timestamp.slice(5,7) - 1]}&nbsp;
        {covidSummary.timestamp.slice(0,4)}
        . In the past 24 hours,{" "}
        {indPlaceVal(covidSummary.indiaNewConfirmed)} new cases were reported,
        accounting for about{" "}
        {(
          (covidSummary.indiaNewDeaths / covidSummary.worldNewDeaths) *
          100
        ).toFixed(2)}
        % of the new cases reported globally since yesterday. The total number of
        deaths have reached {indPlaceVal(covidSummary.indiaTotalDeaths)} with{" "}
        {indPlaceVal(covidSummary.indiaNewDeaths)} deaths reported in the past 24
        hours. The number of patients who have recovered since yesterday is{" "}
        {indPlaceVal(covidSummary.indiaNewRecovery)} and the total active cases in
        the country at present stand at{" "}
        {indPlaceVal(covidSummary.indiaTotalActive)}.
      </div>
    )
  } else {
    return <Loading />
  }
}

export default React.memo(IntroductionThumbnail)
