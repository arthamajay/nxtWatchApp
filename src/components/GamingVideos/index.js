import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import LeftBar from '../LeftBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingVideos extends Component {
  state = {
    gamingList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/gaming'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        gamingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div
      className="d-flex justify-content-center align-items-center h-100"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="text-center p-3">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        style={{width: '250px'}}
      />
      <h3>Oops! Something Went Wrong</h3>
      <p>We are having some trouble fetching the data. Please try again.</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.getGamingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {gamingList} = this.state
    return (
      <div>
        <div className="d-flex align-items-center bg-light p-3 mb-3">
          <SiYoutubegaming size={30} className="me-2 text-danger" />
          <h2 className="mb-0">Gaming</h2>
        </div>
        <div className="row">
          {gamingList.map(video => (
            <div key={video.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <Link
                to={`/videos/${video.id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                  className="w-100 mb-2 rounded"
                />
                <p className="fw-bold">{video.title}</p>
                <p className="text-muted">
                  {video.viewCount} Watching Worldwide
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderGamingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="d-flex">
          <LeftBar />
          <div className="p-3 flex-grow-1">{this.renderGamingVideos()}</div>
        </div>
      </div>
    )
  }
}

export default withRouter(GamingVideos)
