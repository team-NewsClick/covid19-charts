import React from "react"
import useSWR from "swr"
import { BASE_PATH } from "../../constants"
import { indPlaceVal } from "../../utils"
import Loading from "../helpers/Loading"

/**
 * COVID-19 Update Summary of World in terms of numbers
 * @component
 * @return {JSX.Element} COVID-19 Update Summary of World
 */
const CovidUpdateWorld = ({covidSummary}) => {

  if(covidSummary !== undefined) {
    return (
      <div className="bg-gray-200 p-8 my-10 mx-auto lg:w-11/12">
        <div className="text-center pb-12">
          <div className="text-3xl font-bold leading-8">
            COVID-19 UPDATE: WORLD
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
                {indPlaceVal(covidSummary.worldTotalConfirmed)}
              </div>
            </div>
            <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
              <div className="text-2xl font-bold text-pink-700">
                Total Deaths:&nbsp;
              </div>
              <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
                {indPlaceVal(covidSummary.worldTotalDeaths)}
              </div>
            </div>
          </div>
          <div className="lg:flex lg:px-10 lg:pb-8">
            <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
              <div className="text-2xl font-bold text-green-900">
                Total Recovered:&nbsp;
              </div>
              <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
                {indPlaceVal(covidSummary.worldTotalRecovery)}
              </div>
            </div>
            <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
              <div className="text-2xl font-bold text-red-700">
                Total Active Cases:&nbsp;
              </div>
              <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
                {indPlaceVal(covidSummary.worldTotalActive)}
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
                {indPlaceVal(covidSummary.worldNewConfirmed)}
              </div>
            </div>
            <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
              <div className="text-2xl font-bold text-pink-700">
                New Deaths:&nbsp;
              </div>
              <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
                {indPlaceVal(covidSummary.worldNewDeaths)}
              </div>
            </div>
          </div>
          <div className="lg:flex lg:px-10 lg:pb-8">
            <div className="md:flex lg:w-1/2 pb-8 lg:p-0 lg:pl-12">
              <div className="text-2xl font-bold text-green-900">
                Newly Recovered:&nbsp;
              </div>
              <div className="text-3xl md:text-2xl font-bold pt-2 md:p-0">
                {indPlaceVal(covidSummary.worldNewRecovery)}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-700 text-sm pt-4">
          Source: Center for Systems Science {"&"} Engineering(CSSE) at John
          Hopkins University
        </div>
      </div>
    )
  } else{
    return <Loading />
  }
}

export default React.memo(CovidUpdateWorld)
