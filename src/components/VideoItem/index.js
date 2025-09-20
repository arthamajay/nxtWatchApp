import {withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class VideoItem extends Component {
  onClickVideo = () => {
    const {history, details} = this.props
    history.push(`/videos/${details.id}`)
  }

  render() {
    const {details} = this.props
    const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details

    return (
      <button
        key={id}
        className="video-item m-2 btn"
        type="button"
        onClick={this.onClickVideo}
      >
        <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
        <div className="d-flex mt-2">
          <img
            src={channel.profileImageUrl}
            alt={channel.name}
            className="channel-logo me-2"
          />
          <div>
            <p className="video-title mb-1">{title}</p>
            <p className="channel-name mb-0">{channel.name}</p>
            <p className="video-stats mb-0">
              {viewCount} views • {publishedAt}
            </p>
          </div>
        </div>
      </button>
    )
  }
}

export default withRouter(VideoItem)
