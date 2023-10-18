import React from "react";
import {
  FaAd,
  FaCommentDots,
  FaComments,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const UserCard = ({ user, setSelectedUser, selectedUser }: any) => {
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const isSelected = selectedUser === user;

  return (
    <>
      <div
        onClick={() => handleSelectUser(user)}
        className={`rounded-md flex justify-between items-center p-1 h-12 cursor-pointer
   bg-slate-800 ${isSelected ? "bg-violet-400 " : "bg-slate-800 "}
      `}
        // onClick={userInRoom ? handleSelectRoom : undefined}
      >
        <div className="flex flex-row text-white gap-2 h-full items-center ">
          <div className="bg-slate-700 rounded-md h-full flex flex-row items-center justify-between gap-2 px-2">
            <FaUser size={20} className="fill-slate-500" />
          </div>
          <p
            className={` overflow-hidden
           "text-white" 
          `}
          >
            {user}
          </p>
        </div>
        {/* <div className="flex gap-1 h-full">
          <div className="bg-slate-700 h-full px-2  flex items-center justify-center rounded-md cursor-pointer ">
            <p className="text-slate-500 hover:text-cyan-500 font-bold px-1">
              ...
            </p>
          </div>
          <div className="bg-slate-700 h-full  px-2 flex items-center justify-center rounded-md cursor-pointer">
            <FaCommentDots
              size={20}
              className="fill-slate-500 hover:fill-cyan-500"
              // onClick={(event) => handleJoinRoomClick(room.roomId, event)}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default UserCard;
