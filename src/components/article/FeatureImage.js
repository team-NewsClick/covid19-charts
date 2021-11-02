import React from "react"
import { BASE_PATH } from "../../constants"

/**
 * Feature image of the article
 * @component
 * @return {JSX.Element} Feature image of the article
 */
const FeatureImage = () => {
  return (
    <div id="feature-image">
      <img src = {`../..${BASE_PATH}/img/covid-19-fi.jpg`} alt="" className="mx-auto mb-6" />    </div>
  )
}

export default React.memo(FeatureImage)
