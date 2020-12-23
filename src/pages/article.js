const Article = () => {
  const onClickMenu = () => {
    document.getElementById('menu').classList.toggle('change')
    document.getElementById('nav').classList.toggle('change')
    document.getElementById('menu-bg').classList.toggle('change-bg')
  }
  return (
    <div className="grid grid-cols-12" style={{ fontFamily: 'Noto Sans' }}>
      <div className="col-span-2 sm-hide" />
      <div className="col-span-12 mx-5 sm:col-span-8 sm:mx-0">
        <div className="header">
          <div className="flex header-logos">
            <img
              src="../img/newsclick-logo.png"
              alt="Newsclick Logo"
              className="w-40 h-auto"
            />
            <div
              className="flex self-end justify-end flex-auto"
              style={{ height: '29px' }}
            >
              <img
                src="../img/fb.png"
                alt="Facebook"
                width="29"
                className="social-icon ml-2"
              />
              <img
                src="../img/twitter.png"
                alt="Twitter"
                width="29"
                className="social-icon ml-2"
              />
              <img
                src="../img/yt.png"
                alt="YouTube"
                width="29"
                className="social-icon ml-2"
              />
              <div
                className="md:hidden lg:hidden"
                id="menu-bar"
                onClick={onClickMenu}
              >
                <div id="menu">
                  <div id="bar1" className="bar"></div>
                  <div id="bar2" className="bar"></div>
                  <div id="bar3" className="bar"></div>
                </div>
                <ul className="nav fixed float-left" id="nav">
                  <li>TRENDING</li>
                  <li>TECHNOLOGY</li>
                  <li>POLITICS</li>
                  <li>BUSINESS</li>
                  <li>SPORTS</li>
                  <li>ENTERTAINMENT</li>
                  <li>MISCELLANEOUS</li>
                  <li>
                    <div className="float-left">Search</div>
                    <img
                      src="../img/search.svg"
                      alt="Search"
                      className="pl-2 w-8"
                    />
                  </li>
                  <li>
                    <div className="flex" style={{ height: '29px' }}>
                      <img
                        src="../img/fb.png"
                        alt="Facebook"
                        width="29"
                        className="mr-2"
                      />
                      <img
                        src="../img/twitter.png"
                        alt="Twitter"
                        width="29"
                        className="mr-2"
                      />
                      <img
                        src="../img/yt.png"
                        alt="YouTube"
                        width="29"
                        className="mr-2"
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="menu-bg" id="menu-bg"></div>
            </div>
          </div>
          <div>
            <img
              src="../img/page-title.png"
              alt="Data Visualization"
              className="mx-auto my-8"
            />
          </div>
          <div className="categories">
            <div className="category">TRENDING</div>
            <div className="category">TECHNOLOGY</div>
            <div className="category">POLITICS</div>
            <div className="category">BUSINESS</div>
            <div className="category">SPORTS</div>
            <div className="category">ENTERTAINMENT</div>
            <div className="category">MISCELLANEOUS</div>
            <div className="search ml-2">
              <img src="../img/search.svg" alt="Search" className="" />
            </div>
          </div>
        </div>
        <div className="article my-12">
          <div className="flex text-gray-600">
            <div>Technology</div>
            <div className="flex flex-auto justify-end">22 December 2020</div>
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
            The total confirmed Covid-19 cases in India reached 1,00,75,116 on
            Tuesday. In the past 24 hours, 19,556 new cases were reported,
            accounting for about four percent of the new cases reported globally
            since yesterday. The total number of deaths have reached 1,46,111
            with 301 deaths reported in the past 24 hours. The number of
            patients who have recovered since yesterday is 30,376, and the total
            active cases in the country at present stand at 2,92,518.
          </div>
          <div className="article-subheading">
            COVID-19 Infections and Deaths : India
          </div>
          <div className="font-bold italic">Widget: COVID-19 Update: India</div>
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
          <div className="font-bold italic">
            Widget: CHARTS: SELECTED INDIAN STATES
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
          <div className="font-bold italic">
            Widget: Per Week New Cases and New Tests: Select Indian States{' '}
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
          <div className="font-bold italic">
            Widget: CHARTS: SELECTED INDIAN CITIES
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
          <div className="font-bold italic">
            Widget: COVID-19 UPDATE: GLOBAL
          </div>
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
          <div className="font-bold italic">
            Widget: CHARTS: SELECTED COUNTRIES
          </div>
        </div>
      </div>
      <div className="col-span-2 sm-hide" />
    </div>
  )
}

export default Article
