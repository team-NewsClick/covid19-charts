import Link from 'next/link'

const IndexPage = () => {
  return (
    <div>
      <div className="flex justify-center text-2xl font-bold mt-8">
        View any country or Indian state on the live and customisable version of Covid-19 charts
      </div>
      <div className="flex justify-center">
        <Link href="/charts/CountryTracker">
          <a className="btns">Countries</a>
        </Link>
        <Link href="/charts/StateTracker">
          <a className="btns">States</a>
        </Link>
      </div>
    </div>
  )
}

export default IndexPage
