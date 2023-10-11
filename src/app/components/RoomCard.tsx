import React, { useContext, useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { WebSocketContext } from "../layout";
const RoomCard = ({ room }: { room: any }) => {
  const ws = useContext(WebSocketContext);

  const handleJoinRoomClick = (roomId) => {
    ws.send(JSON.stringify({ type: "joinRoom", roomId }));

    // After creating the room, request the updated list of rooms
    ws.send(JSON.stringify({ type: "requestRooms" }));
  };

  const handleLeaveRoomClick = (roomId) => {
    ws.send(JSON.stringify({ type: "leaveRoom", roomId }));

    // After creating the room, request the updated list of rooms
    ws.send(JSON.stringify({ type: "requestRooms" }));
  };

  // Check if the user is in the room's users array
  const userInRoom = room.users.some(
    (user) => user.username === sessionStorage.getItem("username")
  );
  console.log(userInRoom);
  console.log(sessionStorage.getItem("username"));
  return (
    <div className="text-white  bg-slate-900 rounded-md flex justify-between items-center capitalize p-2 ">
      <div className="flex flex-row text-white gap-2 h-full items-center ">
        <div className="bg-slate-700 rounded-md h-full flex flex-row items-center justify-between gap-2 px-2">
          <p>{room.users.length}</p>
          <FaUserAlt size={20} className="fill-slate-500" />
        </div>
        <p className="text-slate-400 overflow-hidden">{room.roomName}</p>
      </div>

      {userInRoom ? (
        <FaSignOutAlt
          size={30}
          className="fill-slate-500 hover:fill-red-400"
          onClick={() => handleLeaveRoomClick(room.roomId)}
        />
      ) : (
        <FaSignInAlt
          size={30}
          className="fill-slate-500 hover:fill-cyan-500"
          onClick={() => handleJoinRoomClick(room.roomId)}
        />
      )}
    </div>
  );
};

export default RoomCard;
