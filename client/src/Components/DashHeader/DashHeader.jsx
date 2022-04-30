import React from "react";

const DashHeader = () => {
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
          Groups
        </a>
        <a href="" className="">
          Balances
        </a>
      </div>
    </div>
  );
};

export default DashHeader;
