import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ChatRoomUsers = () => {
  return (
    <div className=" flex flex-col gap-2 bg-slate-700 p-4   w-full rounded-md h-1/5">
      <h1>Roomname</h1>
      <h2 className="text-white text-lg">Users:</h2>
      <div className="flex flex-wrap gap-2 w-full ">
        <div className="flex flex-row gap-2 bg-slate-800 p-2 rounded-xl text-white items-center capitalize pr-4">
          <FaUserCircle size={20} fill="white" />
          <p>
            Jens Erven <span className="text-slate-500">(You)</span>
          </p>
        </div>
        {/* <div className="flex flex-row gap-2 bg-slate-800 p-2 rounded-xl text-white items-center capitalize pr-4">
          <FaUserCircle size={20} fill="white" />
          <p>Stephan Van Hemelrijck</p>
        </div> */}
      </div>
    </div>
  );
};

export default ChatRoomUsers;
