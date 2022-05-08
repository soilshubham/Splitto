import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-4 md:px-32 py-10 font-manrope">
      <div className="flex items-center">
        <h1 className="mr-auto text-purp1 font-extrabold text-lg">
          <Link to="/">Splitto</Link>
        </h1>
        <Link to="/register">
          <button className="tracking-wide text-base mr-5">Register</button>
        </Link>
        <Link to="/login">
          <button className="tracking-wide bg-[#9370DB] py-3 px-9 rounded-lg text-white max-w-max text-base">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
