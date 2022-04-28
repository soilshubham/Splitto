import React from "react";
import './navbar.css';

const Navbar = () => {
  return (
  <div className="container">
    <h1 className="logo">Splitto</h1>
    <h1 className="signIn">Sign In</h1>
    <button className="startFreeButton"> Start Free </button>
  </div>
  )
};

export default Navbar;
