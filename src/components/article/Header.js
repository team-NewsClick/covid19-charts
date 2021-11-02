import React from "react"
import { BASE_PATH } from "../../constants"

/**
 * Contains website-logo, web-app-logo, categories, search-bar, menu and social-media links
 * @component
 * @return {JSX.Element} Web-app's header
 */
const Header = () => {
  const onClickMenu = () => {
    document.getElementById("menu").classList.toggle("change")
    document.getElementById("nav").classList.toggle("change")
    document.getElementById("menu-bg").classList.toggle("change-bg")
  }

  const showHideSearch = (e) => {
    const searchBar = document.getElementById("search-bar")
    searchBar.style.display == "none"
      ? (searchBar.style.display = "block")
      : (searchBar.style.display = "none")
  }

  return (
    <div className="header">
      <div className="flex header-logos">
        <a href="https://www.newsclick.in/" target="_blank" rel="noreferrer">
          <img
            src={`..${BASE_PATH}/img/newsclick-logo.png`}
            alt="Newsclick Logo"
            className="w-40 h-auto"
          />
        </a>
        <div
          className="flex self-end justify-end flex-auto"
          style={{ height: "29px" }}
        >
          <a
            href="https://www.facebook.com/newsclickonline/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`..${BASE_PATH}/img/fb.png`}
              alt="Facebook"
              className="social-icon block"
            />
          </a>
          <a href="https://twitter.com/newsclickin" rel="noreferrer">
            <img
              src={`..${BASE_PATH}/img/twitter.png`}
              alt="Twitter"
              className="social-icon block"
            />
          </a>
          <a href="https://www.youtube.com/user/NewsClickin" rel="noreferrer">
            <img
              src={`..${BASE_PATH}/img/yt.png`}
              alt="YouTube"
              className="social-icon block"
            />
          </a>

          {/* UNCOMMENT THIS BLOCK WHILE COMMENTING/REMOVING ABOVE CODE
          <a href="https://www.facebook.com/newsclickonline/" target="_blank">
            <img
              src="../covid/img/fb.png"
              alt="Facebook"
              className="social-icon sm-hide md:hidden lg:block"
            />
          </a>
          <a href="https://twitter.com/newsclickin">
            <img
              src="../covid/img/twitter.png"
              alt="Twitter"
              className="social-icon sm-hide md:hidden lg:block"
            />
          </a>
          <a href="https://www.youtube.com/user/NewsClickin">
            <img
              src="../covid/img/yt.png"
              alt="YouTube"
              className="social-icon sm-hide md:hidden lg:block"
            />
          </a> */}

          {/* <div className="lg:hidden" id="menu-bar" onClick={onClickMenu}>
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
              <li onClick={showHideSearch}>
                <div className="float-left">Search</div>
                <img
                  src="../covid/img/search.svg"
                  alt="Search"
                  className="pl-2 w-8"
                />
              </li>
              <li>
                <div className="flex" style={{ height: '29px' }}>
                  <a href="https://www.facebook.com/newsclickonline/" target="_blank">
                    <img src="../covid/img/fb.png" alt="Facebook" className="mr-2"  />
                  </a> 
                  <a href="https://twitter.com/newsclickin" target="_blank">
                  <img src="../covid/img/twitter.png" alt="Twitter" className="mr-2"  />
                  </a> 
                  <a href="https://www.youtube.com/user/NewsClickin" target="_blank">
                  <img src="../covid/img/yt.png" alt="YouTube" className="mr-2"  />
                  </a> 
                </div>
              </li>
            </ul>
          </div> */}
          <div className="menu-bg" id="menu-bg"></div>
        </div>
      </div>
      <div>
        <img
          src={`..${BASE_PATH}/img/page-title.png`}
          alt="Data Visualization"
          className="mx-auto my-8"
        />
      </div>
      {/* <div className="categories sm-hide md:hidden lg:flex">
        <div className="category">TRENDING</div>
        <div className="category">TECHNOLOGY</div>
        <div className="category">POLITICS</div>
        <div className="category">BUSINESS</div>
        <div className="category">SPORTS</div>
        <div className="category">ENTERTAINMENT</div>
        <div className="category">MISCELLANEOUS</div>
        <div className="search ml-2 cursor-pointer">
          <img src="../covid/img/search.svg" alt="Search" onClick={showHideSearch} />
        </div>
      </div> */}
      <div id="search-bar" style={{ display: "none" }}>
        <div className="flex justify-center items-center h-16 my-2 bg-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search on NewsClick"
            className="sm:w-auto md:w-3/5 h-10 px-2 border-2 border-gray-600"
          />
          <input
            type="button"
            value="Search"
            className="search-btn m-4 px-3 py-1.5"
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header)