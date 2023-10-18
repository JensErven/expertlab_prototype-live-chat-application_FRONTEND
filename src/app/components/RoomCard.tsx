import React, { useContext, useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt, FaUsers } from "react-icons/fa";
import { WebSocketContext } from "../layout";
const RoomCard = ({ room, setSelectRoom, selectedRoom }: any) => {
  const [userInRoom, setUserInRoom] = useState(false);
  const ws = useContext(WebSocketContext);
  useEffect(() => {
    const userInRoom = room.users.some(
      (user) => user.username === sessionStorage.getItem("username")
    );
    setUserInRoom(userInRoom);
  }, [room]);
  const handleJoinRoomClick = (roomId, event) => {
    event.stopPropagation();

    ws.send(JSON.stringify({ type: "joinRoom", roomId }));

    // After creating the room, request the updated list of rooms
    ws.send(JSON.stringify({ type: "requestRooms" }));
  };

  const handleLeaveRoomClick = (roomId, event) => {
    event.stopPropagation();

    ws.send(JSON.stringify({ type: "leaveRoom", roomId }));

    setSelectRoom(null);
  };

  // Check if the user is in the room's users array

  const handleSelectRoom = () => {
    if (room && userInRoom) {
      setSelectRoom(room);
    } else {
      setSelectRoom(null);
    }
  };
  const isSelected = selectedRoom && selectedRoom.roomId === room.roomId;
  return (
    <div
      className={`rounded-md flex justify-between items-center  p-1 h-12 cursor-pointer ${
        isSelected ? "bg-violet-400 " : "bg-slate-800 "
      }`}
      onClick={userInRoom ? handleSelectRoom : undefined}
    >
      <div className="flex flex-row text-white gap-2 h-full items-center ">
        <div className="bg-slate-700 rounded-md h-full flex flex-row items-center justify-between gap-2 px-2">
          <p>{room.users.length}</p>
          <FaUsers size={20} className="fill-slate-500" />
        </div>
        <p
          className={` overflow-hidden ${
            isSelected ? "text-white" : "text-slate-400"
          }`}
        >
          {room.roomName}
        </p>
      </div>
      <div className="bg-slate-700 h-full  px-2 flex items-center justify-center rounded-md">
        {userInRoom === true ? (
          <FaSignOutAlt
            size={20}
            className="fill-red-400 hover:fill-red-500 transition duration-100 ease-in-out"
            onClick={(event) => handleLeaveRoomClick(room.roomId, event)}
          />
        ) : (
          <FaSignInAlt
            size={20}
            className="fill-cyan-500 hover:fill-cyan-500"
            onClick={(event) => handleJoinRoomClick(room.roomId, event)}
          />
        )}
      </div>
    </div>
  );
};

export default RoomCard;
