import { useEffect, useState } from "react"
import Header from "../components/article/Header"
import Footer from "../components/article/Footer"
import IntroductionThumbnail from "../components/article/IntroductionThumbnail"
import AnchorLinks from "../components/article/AnchorLinks"
import CategoryPublishingDate from "../components/article/CategoryPublishingDate"
import ArticleTitle from "../components/article/ArticleTitle"
import FeatureImage from "../components/article/FeatureImage"
import CovidUpdateIndia from "../components/article/CovidUpdateIndia"
import CovidUpdateWorld from "../components/article/CovidUpdateWorld"
import StateVaccination from "../components/StateVaccination"
// import RelatedPosts from "../components/article/RelatedPosts"

/**
 * Article Page
 * @return {JSX.Element} Article Page
 */
const Article = () => {
  const [windowWidth, setWindowWidth] = useState("200px")

  useEffect(() => {
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : "800px")
    window.addEventListener("message", (a) => {
      if (void 0 !== a.data["datawrapper-height"])
        for (var e in a.data["datawrapper-height"]) {
          var t =
            document.getElementById("datawrapper-chart-" + e) ||
            document.querySelector("iframe[src*='" + e + "']")
          t && (t.style.height = a.data["datawrapper-height"][e] + "px")
        }
    })
  }, [])

  return (
    <div className="grid grid-cols-12" style={{ fontFamily: "Noto Sans" }}>
      <title>COVID-19 Cases: Data and Graphs of India and the World</title>
      <div className="col-span-2 sm-hide"></div>
      <div className="col-span-12 mx-5 sm:col-span-8 sm:mx-0">
        <Header />
        <div className="article my-12">
          <CategoryPublishingDate />
          <ArticleTitle />
          <FeatureImage />
          <AnchorLinks />
          <IntroductionThumbnail />
          <div className="create-anchor article-subheading">
            COVID-19 Infections and Deaths : India
          </div>
          <CovidUpdateIndia />
          <div className="article-para">
            The chart below shows the trajectory of the pandemic in each state
            from March 2020, with a 7-day moving average. The user can select up
            to six States at a time.
            <br />
            <br />
            If the date adjusted tab is selected to on, it shows progression of
            the pandemic from when each state reached its first 100 cumulative
            cases and 10 new cases; e.g., Maharashtra reached its first 10 cases
            on March 25, 2020, and is taken as Day 0. Similarly, it is
            considered Day 0 when a state reached the mark of first 3 new deaths
            per day and first 100 cumulative deaths, e.g., Maharashtra (Day 0)
            reached it on April 2, 2020.
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
                : windowWidth * 0.52
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
          <div className="article-para">
            The section below displays state-wise vaccination data. The
            selections allow the user to get data on total vaccination doses
            administered till date, daily vaccination doses and vaccination
            doses administered per lakh (100,000) of population across States.
            The data is also shown in the form of a Map.
          </div>
          <div>
            <div className="create-anchor opacity-0 height-0">
              Vaccination: India
            </div>
            <StateVaccination className="mx-auto" />
          </div>
          <div className="article-para">
            The table below shows the 7-day moving average of Daily Covid-19
            cases, Tests conducted and Positivity Rate (daily cases/tests) for
            the last 30 days for each state. Total Tests and Tests/Million
            population is also shown for each state.
          </div>
          <div className="my-16">
            <div className="create-anchor opacity-0 height-0">
              Testing Data: India
            </div>
            <iframe
              title="COVID-19 Testing Data for Indian States &amp;amp; UT"
              aria-label="chart"
              id="datawrapper-chart-ybmUS"
              src="https://datawrapper.dwcdn.net/8w1aQ/3/"
              scrolling="no"
              frameBorder="0"
              style={{ minWidth: "100% !important" }}
              className="w-0 border-none"
            ></iframe>
          </div>
          <div className="article-para">
            The chart below show the trajectory of the pandemic in each select
            city from April end, 2020 with a 7-day moving average. The user can
            select up to six States at a time.
            <br />
            <br />
            If the date adjusted tab is selected to on, it shows the progression
            of the pandemic from when each city reached cumulative 100 or 10 new
            cases per day, e.g, Mumbai reached this on 28 March 2020 and is
            taken as zero date. For total deaths and new deaths, the starting
            point is 100 deaths per day and 3 new death per day respectively in
            Mumbai.
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
                : windowWidth * 0.52
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
          <div>
            <div className="create-anchor opacity-0 height-0">
              COVID Maps: India
            </div>
            <div className="article-para">
              The Map gives data on Total Cases, Active Cases, Total Deaths, New
              cases, and New Deaths with appropriate tabs.
            </div>
            <div className="flex pb-12">
              <iframe
                id="states-map"
                src="/maps/states"
                scrolling="no"
                frameBorder="0"
                width={windowWidth > 800 ? windowWidth * 0.4 : windowWidth}
                height={(windowWidth < 800
                  ? windowWidth > 700
                    ? windowWidth * 0.8
                    : windowWidth * 1.18
                  : windowWidth * 0.48
                ).toString()}
                className="mx-auto mt-16"
              ></iframe>
            </div>
          </div>
          <div className="article-para">
            The map below gives district level Active Cases, Total Cases and
            Total Deaths. For six States/UTs - Andaman and Nicobar Islands,
            Assam, Goa, Manipur, Sikkim and Telangana, the district wise data
            may have some discrepancies. Also, the district-wise data for Delhi
            is not available and the map shows the data for the NCT of Delhi.
          </div>
          <div className="flex pb-12">
            <iframe
              id="districts-map"
              src="/maps/districts"
              scrolling="no"
              frameBorder="0"
              width={windowWidth > 800 ? windowWidth * 0.4 : windowWidth}
              height={(windowWidth < 800
                ? windowWidth > 700
                  ? windowWidth * 0.8
                  : windowWidth * 1.18
                : windowWidth * 0.48
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
          <div className="create-anchor article-subheading">
            COVID-19 Infections and Deaths: Global
          </div>
          <CovidUpdateWorld />
          <div className="article-para">
            The chart below shows the trajectory of the pandemic across
            countries, with a 7-day moving average. The user can select up to
            six countries at a time.
            <br />
            <br />
            The starting point of a country is adjusted to a common zero day
            when each of them crossed the 100 mark for total cases, e.g., Italy
            started before others, and has been given the starting date of 0, on
            23rd February, 2020. For total deaths, the starting point is 100
            deaths and for new deaths it is 3 recorded deaths.
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
                : windowWidth * 0.52
              ).toString()}
              className="mx-auto mt-16"
            ></iframe>
          </div>
        </div>
        {/* <RelatedPosts /> */}
        <Footer />
      </div>
      <div className="col-span-2 sm-hide"></div>
    </div>
  )
}

export default Article
