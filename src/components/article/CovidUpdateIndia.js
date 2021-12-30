import React from "react"
import useSWR from "swr"
import { indPlaceVal } from "../../utils"
import Loading from "../helpers/Loading"

/**
 * COVID-19 Update Summary of India in terms of numbers
 * @component
 * @return {JSX.Element} COVID-19 Update Summary of India
 */
const CovidUpdateIndia = () => {
  const { data, error } = useSWR("/api/covidSummary")
  const statsSummary = data
  if (error) return <div>Failed to Load</div>
  if (!data) {
    return (
      <div className="lg:flex h-screen">
        <div className="m-auto">
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-200 p-8 my-10 mx-auto lg:w-11/12">
      <div className="text-center pb-12">
        <div className="text-3xl font-bold leading-8">
          COVID-19 UPDATE: INDIA
        </div>
        <div className="text-gray-700">
          Data Last Updated on {new Date().toUTCString().slice(5, 16)}
        </div>
      </div>
      <div className="">
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-yellow-900">
              Total Confirmed Cases:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaTotalConfirmed)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-pink-700">
              Total Deaths:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaTotalDeaths)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-blue-900">
              Total Samples Tested:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaTotalTests)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-green-900">
              Total Recovered:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaTotalRecovery)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-red-700">
              Total Active Cases:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaTotalActive)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-green-900">
              Total Vaccinations:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaTotalVaccinated)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-blue-900">
              First Dose Vaccinations: &nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {statsSummary.firstDoseAdministered}%
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-green-900">
              Fully Vaccinated: &nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {statsSummary.secondDoseAdministered}%
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
              {indPlaceVal(statsSummary.indiaNewConfirmed)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-pink-700">
              New Deaths:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaNewDeaths)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-blue-900">
              New Samples Tested:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaNewTests)}
            </div>
          </div>
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-green-900">
              Newly Recovered:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaNewRecovery)}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:px-10 lg:pb-8">
          <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
            <div className="text-2xl font-bold text-blue-900">
              New Vaccines Administered:&nbsp;
            </div>
            <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
              {indPlaceVal(statsSummary.indiaNewVaccinated)}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-700 text-sm pt-4">
        Source: incovid19.org
      </div>
    </div>
  )
}

export default React.memo(CovidUpdateIndia)
