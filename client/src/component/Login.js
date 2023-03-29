import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onLogin = async (e) => {
    console.log(this.state);
    try {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };
      const body = JSON.stringify(user);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:3000/user/login",
        body,
        config
      );
      console.log(res);
      if (res.status == 200) {
        this.setState({
          ...this.state,
          error: this.state.username + " user is logged in successfully!",
        });
        window.location.replace("/studentlist");
      } else {
        this.setState({ ...this.state, error: res.statusText });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <h4>{this.state.error}</h4>
        <table>
          <tbody>
            <tr>
              <td>User Name:</td>
              <td>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.onChange(e)}
                  placeholder=" Enter Your UserName"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.onChange(e)}
                  placeholder=" Enter Your Password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <NavLink to="/register">Register Here</NavLink>
              </td>
              <td>
                <input
                  type="button"
                  name="btnSubmit"
                  value="Login"
                  onClick={(e) => this.onLogin(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
