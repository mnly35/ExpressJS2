import React, { useContext } from "react";
import studentContext from "./studentContext";

function Header(props) {
  let context = useContext(studentContext);
  return (
    <div>
      <h1> {props.collegeName} </h1>
      <h2>Welcome User {context.username}</h2>
    </div>
  );
}

export default Header;
