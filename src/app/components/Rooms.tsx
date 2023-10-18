"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";

import RoomsList from "./RoomsList";
import { FaPlus, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { WebSocketContext } from "../layout";

const Rooms = ({
  setIsModalOpen,
  rooms,
  username,
  setSelectRoom,
  selectedRoom,
}: {
  setIsModalOpen: any;
  rooms: any;
  username: any;
  setSelectRoom: any;
  selectedRoom: any;
}) => {
  const ws = useContext(WebSocketContext);

  // Create a WebSocket connection
  const router = useRouter();

  const handleSignout = () => {
    // Close the WebSocket connection
    // Note: Replace `ws` with your WebSocket connection reference
    ws.close();

    // Perform any other signout actions if necessary

    // Redirect to the start screen
    router.push(`/`);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="h-1/2 flex flex-col gap-4   ">
      <div className="w-full flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-lg capitalize">
          Hello, {username ? username : <></>}
        </h2>
        <button
          className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold"
          onClick={handleSignout}
        >
          <FaSignOutAlt size={20} fill="white" />
        </button>
      </div>
      <hr className="border-slate-500 border w-full"></hr>

      <div className="flex flex-row gap-4 items-center justify-between">
        {" "}
        <h1>Rooms</h1>
        <button
          className="bg-cyan-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold"
          onClick={openModal}
        >
          <FaPlus size={20} fill="white" />
        </button>
      </div>
      <div className="flex flex-row items-center w-full">
        <input
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-[80%]"
          placeholder="search room..."
        ></input>
        <div className="p-2 flex bg-slate-800 rounded-r-md  h-full items-center  w-[20%] justify-center">
          <FaSearch size={20} className="fill-slate-600" />
        </div>
      </div>
      {/* <hr className="border-slate-500 border"></hr> */}
      <RoomsList
        rooms={rooms}
        setSelectRoom={setSelectRoom}
        selectedRoom={selectedRoom}
      />
    </div>
  );
};

export default Rooms;
