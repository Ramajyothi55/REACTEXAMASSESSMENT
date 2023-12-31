import React, { Fragment, Component } from "react";
import { setAuth } from "../../components/Routes/utils/auth";
import "./Login.css";

class Login extends Component {

  state = {
    username: "",
    password: "",
    userLoggedIn: false
  }

  handleUsernameChange = (e) => this.setState({ username: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  initiateLogin = () => {
    if (this.state.username !== this.state.password  ) {
      alert("Please enter valid credentials");
      return;
    }
    if (this.state.username === this.state.password) {
      localStorage.setItem("isUserLoggedIn", true);
      setAuth(true);
      alert("Login Successful");
      this.props.history.push("/");
      this.setState({ userLoggedIn: true })
      return;
    }
  }
  render() {
    return (
      <Fragment>
        <main className="MainContainer">
          <div>
            <form className="LoginForm">
              <h1>Sign In</h1>
              <input
                className="InputField"
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                placeholder="Enter Username"
              />
              <input
                className="InputField"
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                placeholder="Enter Password"
              />
              <button className="Button" id="login-btn" onClick={this.initiateLogin}>
                Login
              </button>
            </form>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default Login;