import Link from 'next/link'

const IndexPage = () => {
  return (
    <div>
      <div className="flex justify-center text-3xl font-bold mt-8">
        Coronavirus Tracker.
      </div>
      <div className="flex justify-center text-2xl font-bold mt-8">
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
      </div>
    </div>
  )
}

export default IndexPage
