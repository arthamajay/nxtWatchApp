import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {MdWatchLater, MdBookmark} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import LeftBar from '../LeftBar'
import SavedVideosContext from '../../context/SavedVideosContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {channel: {}},
    liked: false,
    disliked: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/videos/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
          id: data.video_details.id,
          title: data.video_details.title,
          videoUrl: data.video_details.video_url,
          thumbnailUrl: data.video_details.thumbnail_url,
          description: data.video_details.description,
          viewCount: data.video_details.view_count,
          publishedAt: data.video_details.published_at,
          channel: {
            name: data.video_details.channel.name,
            profileImageUrl: data.video_details.channel.profile_image_url,
            subscriberCount: data.video_details.channel.subscriber_count,
          },
        }
        this.setState({
          videoDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getYearsDifference = publishedAt => {
    const publishedDate = new Date(publishedAt)
    const currentDate = new Date()
    let years = currentDate.getFullYear() - publishedDate.getFullYear()
    const hasNotHadAnniversary =
      currentDate.getMonth() < publishedDate.getMonth() ||
      (currentDate.getMonth() === publishedDate.getMonth() &&
        currentDate.getDate() < publishedDate.getDate())
    if (hasNotHadAnniversary) years -= 1
    return years
  }

  likeButton = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      disliked: prevState.liked ? prevState.disliked : false,
    }))
  }

  dislikeButton = () => {
    this.setState(prevState => ({
      disliked: !prevState.disliked,
      liked: prevState.disliked ? prevState.liked : false,
    }))
  }

  renderLoader = () => (
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
        onClick={this.getVideoDetails}
      >
        Retry
      </button>
    </div>
  )

  renderVideoDetails = () => (
    <SavedVideosContext.Consumer>
      {({savedVideos, addVideo, removeVideo}) => {
        const {videoDetails, liked, disliked} = this.state
        const {
          videoUrl,
          title,
          publishedAt,
          description,
          channel,
          viewCount,
        } = videoDetails
        const {name, profileImageUrl, subscriberCount} = channel
        const isSaved = savedVideos.some(v => v.id === videoDetails.id)

        return (
          <div>
            <Header />
            <div className="d-flex">
              <LeftBar />
              <div className="right-side m-2">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="80vw"
                  height="500px"
                />
                <h3>{title}</h3>
                <div className="d-flex justify-content-between align-items-center">
                  <p>
                    {viewCount} views • {this.getYearsDifference(publishedAt)}{' '}
                    years ago
                  </p>
                  <div>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.likeButton}
                    >
                      {liked ? <AiFillLike size={24} /> : <BiLike size={24} />}
                      Like
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.dislikeButton}
                    >
                      {disliked ? (
                        <AiFillDislike size={24} />
                      ) : (
                        <BiDislike size={24} />
                      )}
                      Dislike
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => {
                        if (isSaved) removeVideo(videoDetails.id)
                        else addVideo(videoDetails)
                      }}
                    >
                      {isSaved ? (
                        <MdBookmark size={24} />
                      ) : (
                        <MdWatchLater size={24} />
                      )}
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-start align-items-start">
                  <img
                    src={profileImageUrl}
                    alt={name}
                    style={{height: '50px'}}
                  />
                  <div>
                    <p>{name}</p>
                    <p>{subscriberCount} subscribers</p>
                    <br />
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </SavedVideosContext.Consumer>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderVideoDetails()
      default:
        return null
    }
  }
}

export default VideoItemDetails
