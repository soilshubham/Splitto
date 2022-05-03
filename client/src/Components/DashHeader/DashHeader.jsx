import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashHeader = () => {
  let navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="flex py-6 font-manrope">
      <div className="font-bold text-[#3734A9] mb-9 text-lg mr-auto">
        Splitto
      </div>
      <div className="flex gap-6">
        <a href="" className="">
          Home
        </a>
        <a href="" className="">
          Balances
        </a>
        <div className="cursor-pointer" onClick={handelLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
