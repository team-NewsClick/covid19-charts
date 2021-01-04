import useSWR from 'swr'
import LoaderFunction from '../components/LoaderFunction'

const CovidUpdateWorld = () => {
  const { data, error } = useSWR('/api/covidSummary')
  const statsSummary = data
  if (error) return <div>Failed to Load</div>
  if (!data) {
    return (
      <div className="lg:flex h-screen">
        <div className="m-auto">
          <LoaderFunction />
        </div>
      </div>
    )
  }

  const indPlaceVal = (x) => {
    x = x.toString()
    var lastThree = x.substring(x.length - 3)
    var otherNumbers = x.substring(0, x.length - 3)
    if (otherNumbers != '') lastThree = ',' + lastThree
    var number = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
    return number
  }

  return (
    <div className="bg-gray-200 p-8 my-10 mx-auto lg:w-11/12">
      <div className="text-center pb-12">
        <div className="text-3xl font-bold leading-8">
          COVID-19 UPDATE: WORLD
        </div>
        <div className="text-gray-700">
          Data Last Updated at 8:00 AM, {new Date().toUTCString().slice(5,16)}
        </div>
      </div>
      <div className="">
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-yellow-900">
              Total Confirmed Cases:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldTotalConfirmed)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-pink-700">
              Total Deaths:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldTotalDeaths)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-green-900">
              Total Recovered:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldTotalRecovery)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-red-700">
              Total Active Cases:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldTotalActive)}
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold text-center py-10">
        last 24 Hours Update
      </div>
      <div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-yellow-900">
              New Confirmed Cases:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldNewConfirmed)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-pink-700">
              New Deaths:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldNewDeaths)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-green-900">
              Newly Recovered:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.worldNewRecovery)}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-700 text-sm pt-4">
        Source: Center for Systems Science {'&'} Engineering(CSSE) at John
        Hopkins University
      </div>
    </div>
  )
}

export default CovidUpdateWorld
