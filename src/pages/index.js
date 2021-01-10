import Link from 'next/link'

const IndexPage = () => {
  return (
    <div>
      <div className="flex justify-center text-3xl font-bold mt-8">
        COVID-19 Tracker
      </div>
      <div className="flex justify-center text-2xl font-bold mt-8 mb-4 mx-4 leading-7 text-justify">
        Find any country or Indian states in the live-updating and customisable version of Newsclick's Covid-19 trajectory charts
      </div>
      <div className="flex justify-center">
        <Link href="/charts/CountryTracker">
          <a className="btns">Countries</a>
        </Link>
        <Link href="/charts/StateTracker">
          <a className="btns">States</a>
        </Link>
        <Link href="/charts/CityTracker">
          <a className="btns">Cities</a>
        </Link>
        <Link href="/maps/states">
          <a className="btns">States Map</a>
        </Link>
        <Link href="/maps/districts">
          <a className="btns">Districts Map</a>
        </Link>
      </div>
    </div>
  )
}

export default IndexPage
