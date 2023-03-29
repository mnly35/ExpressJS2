import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      repassword: "",
      error: "",
    };
  }
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onRegister = async (e) => {
    console.log(this.state);
    //Verify Password is matchin with rePassword
    if (this.state.password !== this.state.repassword) {
      this.setState({
        ...this.state,
        error: "Password does not match with Re-type Password!",
      });
      return;
    }

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
      const res = await axios.post("http://localhost:3000/user", body, config);
      console.log(res);
      this.setState({ ...this.state, error: "User saved successfully" });
    } catch (error) {
      console.log(error);
      this.setState({ ...this.state, error: error });
    }
  };
  render() {
    return (
      <div>
        <h2>Register</h2>
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
              <td>Re-type Password</td>
              <td>
                <input
                  type="password"
                  name="repassword"
                  value={this.state.repassword}
                  onChange={(e) => this.onChange(e)}
                  placeholder=" Re-Enter Your Password"
                  required
                />
              </td>
            </tr>
            <tr>
              <td> </td>
              <td>
                <input
                  type="button"
                  name="btnSubmit"
                  value="Register"
                  onClick={(e) => this.onRegister(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
