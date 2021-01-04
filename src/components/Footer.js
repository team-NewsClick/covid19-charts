const Footer = () => {
  return (
    <div className="footer block lg:flex lg:flex-row-reverse">
      <div className="grid lg:flex">
        <div className="pr-4 mx-auto">Subscribe:</div>
        <div className="flex">
          <input
            type="text"
            placeholder="example@example.com"
            className="text-black p-1 border-2 border-white"
          />
          <input
            type="button"
            value="Submit"
            className="bg-blue-900 border-white border-2 px-2 py-1 cursor-pointer"
          />
        </div>
      </div>
      <div className="mx-auto">
        <div>Connect on:</div>
        <div className="flex">
          <a href="https://www.facebook.com/newsclickonline/" target="_blank">
            <img src="../img/fb.png" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://twitter.com/newsclickin" target="_blank">
            <img src="../img/twitter.png" alt="Twitter" className="social-icon" />
          </a>
          <a href="https://www.youtube.com/user/NewsClickin" target="_blank">
            <img src="../img/yt.png" alt="YouTube" className="social-icon " />
          </a>
        </div>
      </div>
      <a href="https://www.newsclick.in/about-us">
        <div className="mx-auto cursor-pointer text-white">About NewsClick</div>
      </a>
    </div>
  )
}

export default Footer
