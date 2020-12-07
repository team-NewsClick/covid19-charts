import Link from 'next/link'

const IndexPage = () => {
  return (
    <>
      <Link href="/charts/CountryTracker">
        <a>Country</a>
      </Link>
      <Link href="/charts/StateTracker">
        <a>State</a>
      </Link>
    </>
  )
}

export default IndexPage
