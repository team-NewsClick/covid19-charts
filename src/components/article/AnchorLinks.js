/**
 * Auto generated anchor tags and links for elements with class "article-subheading"
 * @component
 * @return {JSX.Element} Anchor Links to article-subheading
 */
const AnchorLinks = () => {
  if (typeof window !== "undefined") {
    let anchorPoints = document.getElementsByClassName("create-anchor")
    let anchorLinks = document.getElementById("anchor-links")
    for (let i = 0; i < anchorPoints.length; i++) {
      anchorPoints[i].id = anchorPoints[i].textContent
        .toLowerCase()
        .replace(/[^A-Z0-9]/gi, "-")
        .replace(/-+/g, "-")
    }
    for (let i = 0; i < anchorPoints.length; i++) {
      const a = document.createElement("a")
      a.href = "#" + anchorPoints[i].id
      const div = document.createElement("div")
      const textNode = document.createTextNode(anchorPoints[i].textContent)
      div.classList.add("anchor-btn")
      a.appendChild(textNode)
      div.appendChild(a)
      anchorLinks.appendChild(div)
    }
  }

  return (
    <div
      id="anchor-links"
      className="flex flex-wrap pt-1 text-sm text-center font-bold"
    />
  )
}
export default AnchorLinks
