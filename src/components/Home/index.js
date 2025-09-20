import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Banner from '../Banner'
import LeftBar from '../LeftBar'
import VideoItem from '../VideoItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    videos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedVideos = data.videos.map(video => ({
          id: video.id,
          title: video.title,
          thumbnailUrl: video.thumbnail_url,
          channel: {
            name: video.channel.name,
            profileImageUrl: video.channel.profile_image_url,
          },
          viewCount: video.view_count,
          publishedAt: video.published_at,
        }))
        this.setState({
          videos: updatedVideos,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (err) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
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
        onClick={this.getVideos}
      >
        Retry
      </button>
    </div>
  )

  renderNoVideosView = () => (
    <div className="text-center p-3">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no-vidoes"
        style={{height: '250px'}}
      />
      <div className="text-center">
        <h1>No Search Results found</h1>
        <p>Try different keywords or remove search filter</p>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {videos} = this.state
    if (videos.length === 0) {
      return this.renderNoVideosView()
    }
    return (
      <div className="d-flex flex-wrap">
        {videos.map(video => (
          <Link
            key={video.id}
            to={`/videos/${video.id}`}
            className="text-decoration-none"
          >
            <VideoItem details={video} />
          </Link>
        ))}
      </div>
    )
  }

  renderVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  navigateHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className="d-flex flex-row">
          <LeftBar />
          <div className="right-nav-bar">
            <Banner />
            <div className="d-flex mt-2 me-2">
              <input
                type="search"
                placeholder="Search"
                className="form-control"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={e => e.key === 'Enter' && this.getVideos()}
              />
              <button
                type="button"
                className="input-group-text"
                onClick={this.getVideos}
              >
                <IoIosSearch />
              </button>
            </div>
            <div className="videos-list mt-3">{this.renderVideos()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
