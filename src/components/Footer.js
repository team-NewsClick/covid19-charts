const Footer = () => {
  return (
    <div className="footer block lg:flex">
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
          <img src="../img/fb.png" alt="Facebook" className="social-icon" />
          <img src="../img/twitter.png" alt="Twitter" className="social-icon" />
          <img src="../img/yt.png" alt="YouTube" className="social-icon " />
        </div>
      </div>
      <div className="mx-auto cursor-pointer">About NewsClick</div>
    </div>
  )
}

export default Footer
