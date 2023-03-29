import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";

import StudentList from "./StudentList";
/* import studentContext from "./studentContext"; */

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Manolya Sigirci",
    };
  }
  render() {
    return (
      <BrowserRouter>
        <studentContext.Provider value={this.state}>
          <Header collegeName="Magnolias College" />
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/studentlist" element={<StudentList />}></Route>
          </Routes>
          <Footer companyName="MONO_DI_TRI" />
        </studentContext.Provider>
      </BrowserRouter>
    );
  }
}

/*
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";
import StudentList from "./StudentList";
import studentContext from "./studentContext";
export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Tuncay Gorgulu",
    };
  }

  render() {
    return (
      <BrowserRouter>
        <StudentContext.Provider value={this.state}>
          <HeaderComponent collegeName="intelle" />
          <NavigationComponent />
          <Routes>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
            <Route path="/studentlist" element={<StudentList />}></Route>
          </Routes>
          <FooterComponent companyName="tuncay inc." />
        </StudentContext.Provider>
      </BrowserRouter>
    );
  }
} */
