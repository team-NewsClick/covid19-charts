const RelatedPosts = () => {
  return (
    <div id="related-posts" className="browse-category">
      <div className="browse-category-header">
        <div className="browse-category-title">RELATED POSTS</div>
        <div></div>
      </div>
      <div className="lg:flex md:flex sm:block">
        <div className="article-thumbnail">
          <div>
            <img src="../img/covid-19-fi.jpg" alt="" className="rounded-t-md" />
          </div>
          <div className="article-thumbnail-title">
            COVID-19 Cases: Data and Graphs of India and the World
          </div>
          <div className="article-thumbnail-para">
            In the past 24 hours, 501 Covid-19 deaths were reported in India,
            taking the total deaths to 1,38,122. Also The total confirmed
            Covid-19 cases in India reached 94,99,413.
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              value="LEARN MORE"
              className="article-thumbnail-btn"
            />
          </div>
        </div>
        <div className="article-thumbnail">
          <div>
            <img src="../img/covid-19-fi.jpg" alt="" className="rounded-t-md" />
          </div>
          <div className="article-thumbnail-title">
            COVID-19 Cases: Data and Graphs of India and the World
          </div>
          <div className="article-thumbnail-para">
            In the past 24 hours, 501 Covid-19 deaths were reported in India,
            taking the total deaths to 1,38,122. Also The total confirmed
            Covid-19 cases in India reached 94,99,413.
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              value="LEARN MORE"
              className="article-thumbnail-btn"
            />
          </div>
        </div>
        <div className="article-thumbnail">
          <div>
            <img src="../img/covid-19-fi.jpg" alt="" className="rounded-t-md" />
          </div>
          <div className="article-thumbnail-title">
            COVID-19 Cases: Data and Graphs of India and the World
          </div>
          <div className="article-thumbnail-para">
            In the past 24 hours, 501 Covid-19 deaths were reported in India,
            taking the total deaths to 1,38,122. Also The total confirmed
            Covid-19 cases in India reached 94,99,413.
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              value="LEARN MORE"
              className="article-thumbnail-btn"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          <img
            src="../img/browse-prev.svg"
            alt="Browse Previous"
            className="hover:opacity-50 cursor-pointer"
          />
        </div>
        <div>
          <img
            src="../img/browse-next.svg"
            alt="Next Previous"
            className="hover:opacity-50 mx-3 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default RelatedPosts
