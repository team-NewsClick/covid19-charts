import Link from 'next/link'

const IndexPage = () => {
  return (
    <div className="flex justify-center">
      <Link href="/charts/CountryTracker">
        <a className="btns">Country</a>
      </Link>
      <Link href="/charts/StateTracker">
        <a className="btns">State</a>
      </Link>
    </div>
  )
}

export default IndexPage
