import React from "react"

/**
 * Title of the Article
 * @component
 * @return {JSX.Element} Title of the article
 */
const ArticleTitle = () => {
  return (
    <div
      id="article-title"
      className="text-4xl font-extrabold leading-10 mt-1 mb-8"
    >
      COVID-19 Cases: Data and Graphs of India and the World
    </div>
  )
}

export default React.memo(ArticleTitle)
