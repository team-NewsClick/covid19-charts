import useSWR from 'swr'
import LoaderFunction from '../components/LoaderFunction'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RelatedPosts from '../components/RelatedPosts'
import CovidUpdateIndia from '../components/CovidUpdateIndia'
import CovidUpdateWorld from '../components/CovidUpdateWorld'

const Article = () => {
  const [windowWidth, setWindowWidth] = useState('200px')

  useEffect(() => {
    setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : '800px')
    window.addEventListener('message', (a) => {
      if (void 0 !== a.data['datawrapper-height'])
        for (var e in a.data['datawrapper-height']) {
          var t =
            document.getElementById('datawrapper-chart-' + e) ||
            document.querySelector("iframe[src*='" + e + "']")
          t && (t.style.height = a.data['datawrapper-height'][e] + 'px')
        }
    })
  }, [])

  const { data, error } = useSWR('/api/covidSummary')
  const statsSummary = data
  if (error) return <div>Failed to Load</div>
  if (!data) {
    return (
      <div className="flex h-screen">
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
    <div className="grid grid-cols-12" style={{ fontFamily: 'Noto Sans' }}>
      <div className="col-span-2 sm-hide"></div>
      <div className="col-span-12 mx-5 sm:col-span-8 sm:mx-0">
        <Header />
        <div className="article my-12">
          <div className="flex text-gray-600">
            <div>Science</div>
            <div className="flex flex-auto justify-end">
              {new Date().toUTCString().slice(5, 16)}
            </div>
          </div>
          <div
            id="article-title"
            className="text-4xl font-extrabold leading-10 mt-1 mb-8"
          >
            COVID-19 Cases: Data and Graphs of India and the World
          </div>
          <div id="feature-image">
            <img src="../img/covid-19-fi.jpg" alt="" className="mx-auto mb-6" />
          </div>
          <div className="article-para">
            The total confirmed Covid-19 cases in India reached{' '}
            {indPlaceVal(statsSummary.indiaTotalConfirmed)} on Tuesday. In
            the past 24 hours,{' '}
            {indPlaceVal(statsSummary.indiaNewConfirmed)} new cases were
            reported, accounting for about{' '}
            {(
              (statsSummary.indiaNewDeaths / statsSummary.worldNewDeaths) *
              100
            ).toFixed(2)}
            % of the new cases reported globally since yesterday. The total
            number of deaths have reached{' '}
            {indPlaceVal(statsSummary.indiaTotalDeaths)} with{' '}
            {indPlaceVal(statsSummary.indiaNewDeaths)} deaths reported in
            the past 24 hours. The number of patients who have recovered since
            yesterday is {indPlaceVal(statsSummary.indiaNewRecovery)}, and
            the total active cases in the country at present stand at{' '}
            {indPlaceVal(statsSummary.indiaTotalActive)}.
          </div>
          <div className="article-subheading">
            COVID-19 Infections and Deaths : India
          </div>
          <CovidUpdateIndia />
          <div className="article-para">
            In the chart below is shown the progress of the pandemic from when
            each state reached its first 100 cases. Maharashtra and Kerala were
            the two states that had their first 100 cases on the calendar day
            March 25. That is considered day 0. The number of days each state is
            behind Maharashtra is mentioned in the table below.
          </div>
          <div className="article-para">
            Similarly, for new deaths, it is consider day 0 when the state
            reached 2 cases per day. Maharashtra (day 0) reached it on April 2,
            2020.
          </div>
          <div className="flex items-center">
            <iframe
              id="stateTracker"
              src="/charts/StateTracker"
              scrolling="no"
              frameBorder="0"
              width={windowWidth}
              height={(windowWidth < 800
                ? windowWidth > 700
                  ? windowWidth * 0.92
                  : windowWidth * 1.6
                : windowWidth * 0.5
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
          <div className="article-para">
            The Charts below trace the movement in the number of Confirmed
            Covid-19 cases and the number of Tests conducted in each of the
            select States. Here, the trend has been shown on a weekly basis -
            weekly cases and weekly tests. The data is given for the select
            States for the last 22 weeks only. At present, the data is given for
            the top 11 States in terms of highest number of confirmed cases
            across States.
          </div>
          <div className="my-16">
            <iframe
              title="COVID-19 Testing Data for Indian States &amp;amp; UT"
              aria-label="chart"
              id="datawrapper-chart-ybmUS"
              src="https://datawrapper.dwcdn.net/ybmUS/8/"
              scrolling="no"
              frameBorder="0"
              style={{ minWidth: '100% !important' }}
              className="w-0 border-none"
            ></iframe>
          </div>
          <div className="article-para">
            The graphs below show the statistics for selected cities. We have
            adjusted starting point of the cities to a common zero day when each
            of them crossed the 100 mark for total infected and 10 new cases per
            day. Mumbai has surpassed this point on 28 March 2020. For total
            deaths and new deaths, we have taken the starting point to be when
            they have reported 5 deaths per day and 1 new death per day
            respectively. For total deaths, Hyderabad and Ahmedabad will be
            added as we gather the data.
          </div>
          <div className="flex">
            <iframe
              id="cityTracker"
              src="/charts/CityTracker"
              scrolling="no"
              frameBorder="0"
              width={windowWidth}
              height={(windowWidth < 800
                ? windowWidth > 700
                  ? windowWidth * 0.92
                  : windowWidth * 1.6
                : windowWidth * 0.5
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
          <div className="article-para">
            The set of maps below shows statistics for all the States in India.
          </div>
          <div className="font-bold italic">Widget: INDIA STATES MAPS</div>
          <div className="article-para">
            The set of maps below shows district level statistics for all the
            districts in India. However, for six States/UTs - Andaman and
            Nicobar Islands, Assam, Goa, Manipur, Sikkim and Telangana, the
            district wise data taken from government sources has some
            discrepancies. For instance, for Active Cases in a particular State,
            the separate district-wise data does not add up to the figure
            provided for the entire State. The discrepancies in the data for
            these six States/UTs may be present in categories - Active Cases,
            Total Deaths, New cases, and New Deaths. We are showing all the
            available data and request the readers to exercise caution while
            studying/interpreting the data for these six States/UTs under these
            four categories. The data for Total Cases has no such discrepancy.
            Also, the district-wise data for Delhi is not given and in the Map
            all seven districts show the data for the NCT of Delhi as a whole.
          </div>
          <div className="font-bold italic">Widget: INDIA DISTRICTS MAP</div>
          <div className="article-subheading">
            COVID-19 Infections and Deaths: Global
          </div>
          <CovidUpdateWorld />
          <div className="article-para">
            The graph below show the progress of the disease in a country once
            the number of total infected persons crosses the 100 mark. Since the
            epidemic started in different countries at different times, it is
            difficult to compare them. We have adjusted the starting point of a
            country to a common zero day when each of them crossed the 100 mark
            for total infected. In this group of countries, as Italy started
            before others, it has been given the starting date of 0, which in
            calendar terms was 23rd February. The table below the chart shows
            how many days behind Italy they are. In the charts for total deaths
            7-day moving average of new infections, instead of 100 mark for
            infected, 10 for deaths and new infected have been used as the
            benchmark.
          </div>
          <div className="flex">
            <iframe
              id="countryTracker"
              src="/charts/CountryTracker"
              scrolling="no"
              frameBorder="0"
              width={windowWidth}
              height={(windowWidth < 800
                ? windowWidth > 700
                  ? windowWidth * 0.92
                  : windowWidth * 1.6
                : windowWidth * 0.5
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
        </div>
        <RelatedPosts />
        <Footer />
      </div>
      <div className="col-span-2 sm-hide"></div>
    </div>
  )
}

export default Article
