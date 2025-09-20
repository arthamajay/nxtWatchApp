import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import LeftBar from '../LeftBar'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="d-flex">
          <LeftBar />
          <div className="text-center flex-grow-1 p-5">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              alt="not found"
              style={{width: '300px'}}
            />
            <h2>Page Not Found</h2>
            <p>We are sorry, the page you requested could not be found.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NotFound)
