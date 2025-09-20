import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showPassword: false, showWarning: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheck = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showWarning: data.error_msg})
    }
  }

  render() {
    const {username, password, showPassword, showWarning} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="d-flex flex-row justify-content-center align-items-center m-3 h-100">
        <form
          className="card d-flex flex-column justify-content-center p-3"
          onSubmit={this.onSubmit}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <br />

          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            id="username"
            placeholder="Username"
            className="form-control"
            onChange={this.onChangeUsername}
            type="text"
            value={username}
          />
          <br />

          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            id="password"
            placeholder="Password"
            className="form-control"
            onChange={this.onChangePassword}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
          <br />

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="checkbox"
              checked={showPassword}
              onChange={this.onChangeCheck}
            />
            <label htmlFor="checkbox" className="form-check-label">
              Show Password
            </label>
          </div>
          <br />

          <button className="btn btn-primary" type="submit">
            Login
          </button>
          {showWarning !== '' && <p className="text-danger">*{showWarning}</p>}
        </form>
      </div>
    )
  }
}

export default Login
