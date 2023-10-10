import React from "react";
import RoomsList from "./RoomsList";
import { FaSearch } from "react-icons/fa";

const Rooms = ({ setIsModalOpen }: { setIsModalOpen: any }) => {
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-2/5 bg-slate-700 h-full p-4 flex flex-col gap-4 ">
      <div className="flex flex-row gap-4 items-center justify-between">
        {" "}
        <h1>Rooms</h1>
        <button
          className="bg-cyan-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold"
          onClick={openModal}
        >
          +
        </button>
      </div>
      <div className="flex flex-row items-center w-full">
        <input
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-[80%]"
          placeholder="search room..."
        ></input>
        <div className="p-2 flex bg-slate-500 rounded-r-md  h-full items-center  w-[20%] justify-center">
          <FaSearch size={20} fill="white" />
        </div>
      </div>
      <hr className="border-slate-500 border"></hr>
      <RoomsList />
    </div>
  );
};

export default Rooms;
