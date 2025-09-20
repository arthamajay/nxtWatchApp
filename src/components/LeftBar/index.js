import {Component} from 'react'
import {FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {withRouter} from 'react-router-dom'
import './index.css'

class LeftBar extends Component {
  onClickTrending = () => {
    const {history} = this.props
    history.push('/trending')
  }

  onClickGaming = () => {
    const {history} = this.props
    history.push('/gaming')
  }

  onClickSaved = () => {
    const {history} = this.props
    history.push('/saved')
  }

  onClickHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {location} = this.props
    const {pathname} = location
    console.log(pathname)

    return (
      <div className="left-nav-bar d-flex flex-column justify-content-between p-3">
        <div className="d-flex flex-column justify-content-start align-items-start">
          <button
            className={`mb-2 btn ${
              pathname === '/' ? 'btn-outline-primary' : ''
            }`}
            type="button"
            onClick={this.onClickHome}
          >
            <AiFillHome size={25} className="me-3" />
            Home
          </button>
          <button
            className={`mb-2 btn ${
              pathname === '/trending' ? 'btn-outline-primary' : ''
            }`}
            type="button"
            onClick={this.onClickTrending}
          >
            <HiFire size={25} className="me-3" />
            Trending
          </button>
          <button
            className={`mb-2 btn ${
              pathname === '/gaming' ? 'btn-outline-primary' : ''
            }`}
            type="button"
            onClick={this.onClickGaming}
          >
            <SiYoutubegaming size={25} className="me-3" />
            Gaming
          </button>
          <button
            className={`mb-2 btn ${
              pathname === '/saved' ? 'btn-outline-primary' : ''
            }`}
            type="button"
            onClick={this.onClickSaved}
          >
            <CgPlayListAdd size={25} className="me-3" />
            Saved Videos
          </button>
        </div>
        <div>
          <h2>CONTACT US</h2>
          <FaFacebook size={35} className="me-3" />
          <FaTwitter size={35} className="me-3" />
          <FaLinkedin size={35} className="me-3" />
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </div>
    )
  }
}

export default withRouter(LeftBar)
