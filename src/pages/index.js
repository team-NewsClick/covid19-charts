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
          <a className="btns">Countries Chart</a>
        </Link>
        <Link href="/charts/StateTracker">
          <a className="btns">States Chart</a>
        </Link>
        <Link href="/charts/VaccinationStateTracker">
          <a className="btns">States Vaccination Chart</a>
        </Link>
        <Link href="/charts/CityTracker">
          <a className="btns">Cities Chart</a>
        </Link>
        <Link href="/maps/states">
          <a className="btns">States Map</a>
        </Link>
        <Link href="/maps/districts">
          <a className="btns">Districts Map</a>
        </Link>
        <Link href="/maps/VaccinationStates">
          <a className="btns">States Vaccination Map</a>
        </Link>
      </div>
    </div>
  )
}

export default IndexPage
