import './index.css'

const Banner = () => (
  <div className="banner-background d-flex flex-row justify-content-between">
    <div>
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
      />
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button className="btn btn-outline-secondary" type="button">
        Get IT Now
      </button>
    </div>
  </div>
)

export default Banner
