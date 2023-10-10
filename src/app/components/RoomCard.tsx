import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
const RoomCard = ({ roomName, users }: { roomName: any; users: any }) => {
  return (
    <div className="text-white  bg-slate-800 rounded-md flex justify-between items-center capitalize p-2 ">
      <div className="flex flex-row text-white gap-2 h-full items-center ">
        <p>{roomName}</p>
        <div className="bg-slate-700 rounded-md h-full flex flex-row items-center justify-between gap-2 px-2">
          <p>{users}</p>
          <FaUserAlt size={20} className="fill-slate-500" />
        </div>
      </div>

      <FaSignInAlt size={30} className="fill-white hover:fill-cyan-500" />
    </div>
  );
};

export default RoomCard;
