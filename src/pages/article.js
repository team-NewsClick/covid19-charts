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
            <div className="flex flex-auto justify-end">3 December 2020</div>
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
            COVID-19 INFECTIONS AND DEATHS : INDIA
          </div>
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
          <div>
            <img
              src="../img/blog-image.png"
              alt="article-img"
              className="article-img"
            />
            <div className="article-img-caption">
              How concerned Americans say they are about the coronavirus’s
              effect on the U.S. economy
            </div>
          </div>
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
        </div>
      </div>
      <div className="col-span-2 sm-hide" />
    </div>
  )
}

export default Article
