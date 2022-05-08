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
        <Link to="/dashboard">Splitto</Link>
      </div>
      <div className="flex gap-6">
        <div href="" className="">
          {JSON.parse(localStorage.getItem("userData")).username}
        </div>
        <div className="cursor-pointer" onClick={handelLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
