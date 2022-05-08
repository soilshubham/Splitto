import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ name, members, groupID }) => {
  return (
    <Link to={`group/${groupID}`}>
      <div className=" bg-[#9370DB] text-white border-2 cursor-pointer hover:scale-105 transition-all shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg">
        <span className="text-lg font-semibold">{name}</span>
        <div className="text-sm font-normal">{members} members</div>
      </div>
    </Link>
  );
};

export default GroupCard;
