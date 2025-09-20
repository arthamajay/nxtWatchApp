import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import LeftBar from '../LeftBar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingVideos extends Component {
  state = {
    trendingList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: each.published_at,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))
      this.setState({
        trendingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center h-100">
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
        onClick={this.getTrendingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <ul className="list-unstyled">
        {trendingList.map(video => (
          <li key={video.id} className="mb-3 d-flex">
            <Link
              to={`/videos/${video.id}`}
              className="text-decoration-none text-dark"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                width="250"
                className="me-3"
              />
            </Link>
            <div>
              <p>{video.title}</p>
              <p>{video.channel.name}</p>
              <p>
                {video.viewCount} views • {video.publishedAt}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderTrendingVideos = () => {
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
          <div className="p-3 flex-grow-1">
            <h2>Trending</h2>
            {this.renderTrendingVideos()}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TrendingVideos)
