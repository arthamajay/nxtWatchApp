import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {MdBookmark} from 'react-icons/md'
import SavedVideosContext from '../../context/SavedVideosContext'
import Header from '../Header'
import LeftBar from '../LeftBar'

import './index.css'

class SavedVideos extends Component {
  render() {
    return (
      <SavedVideosContext.Consumer>
        {({savedVideos, removeVideo}) => (
          <div>
            <Header />
            <div className="d-flex">
              <LeftBar />
              <div className="p-3 flex-grow-1">
                <h2>Saved Videos</h2>
                {savedVideos.length === 0 ? (
                  <div className="text-center mt-5">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      style={{width: '250px'}}
                    />
                    <h3>No saved videos found</h3>
                    <p>Save your favorite videos to watch them later.</p>
                  </div>
                ) : (
                  <ul className="list-unstyled">
                    {savedVideos.map(video => (
                      <li
                        key={video.id}
                        className="mb-3 d-flex align-items-start"
                      >
                        <Link
                          to={`/videos/${video.id}`}
                          className="text-decoration-none text-dark me-3"
                        >
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            width="250"
                          />
                        </Link>
                        <div className="flex-grow-1">
                          <p>{video.title}</p>
                          <p>{video.channel.name}</p>
                          <p>
                            {video.viewCount} views • {video.publishedAt}
                          </p>
                        </div>
                        <button
                          className="btn btn-outline-danger ms-3"
                          type="button"
                          onClick={() => removeVideo(video.id)}
                        >
                          <MdBookmark size={24} /> Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </SavedVideosContext.Consumer>
    )
  }
}

export default withRouter(SavedVideos)
