import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {BsMoon} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

class Header extends Component {
  confirmLogout = close => {
    Cookies.remove('jwt_token')
    close()
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center p-4">
        <div>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
        </div>
        <div>
          <BsMoon size={35} className="me-3" />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            className="profile-icon"
            alt="profile-icon"
          />
          <Popup
            modal
            trigger={
              <button className="btn btn-outline-primary" type="button">
                Logout
              </button>
            }
          >
            {close => (
              <div className="popup-content p-4">
                <h5>Are you sure you want to logout?</h5>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.confirmLogout(close)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
