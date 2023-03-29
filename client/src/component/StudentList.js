import React, { Component } from "react";
import axios from "axios";
export default class StudentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      token: "",
    };
  }
  getStudentsList = async () => {
    console.log("Get Student List Function is called...");
    try {
      const config = {
        headers: {
          Authorization: this.state.token,
        },
      };
      const res = await axios.get("http://localhost:3000/student/list", config);
      console.log(res);
      if (res.status == 200) {
        this.setState({ ...this.state, students: res.data });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //The componentDidMount() method is called after the component is rendered.The life cycle method
  componentDidMount() {
    this.getStudentsList();
    console.log("state-students");
    console.log(this.state.students);
  }
  render() {
    return (
      <div>
        <h1>StudentList</h1>
        <table>
          <thead>
            <tr>
              <td>SNo</td>
              <td>Name</td>
              <td>City</td>
              <td>Enroll Date</td>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((student, index) => {
              return (
                <tr>
                  <td>{student.sno}</td>
                  <td>{student.sname}</td>
                  <td>{student.scity}</td>
                  <td>{student.enrolldate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
