import Link from "next/link"

/**
 * Index Page
 * @return {JSX.Element} Index Page
 */
const IndexPage = () => {
  return (
    <div>
      <div className="flex justify-center text-3xl font-bold mt-8">
        COVID-19 Tracker
      </div>
      <div className="flex justify-center text-2xl font-bold mt-8 mb-4 mx-4 leading-7 text-justify">
        Find any country or Indian states in the live-updating and customisable
        version of Newsclick's Covid-19 trajectory charts and Maps
      </div>
      <div className="flex justify-center">
        <Link href="/charts/CountryTracker">
          <div className="btns">Countries Chart</div>
        </Link>
        <Link href="/charts/StateTracker">
          <div className="btns">States Chart</div>
        </Link>
        <Link href="/charts/VaccinationStateTracker">
          <div className="btns">States Vaccination Chart</div>
        </Link>
        <Link href="/charts/CityTracker">
          <div className="btns">Cities Chart</div>
        </Link>
        <Link href="/maps/states">
          <div className="btns">States Map</div>
        </Link>
        <Link href="/maps/districts">
          <div className="btns">Districts Map</div>
        </Link>
        <Link href="/maps/VaccinationStates">
          <div className="btns">States Vaccination Map</div>
        </Link>
      </div>
    </div>
  )
}

export default IndexPage
