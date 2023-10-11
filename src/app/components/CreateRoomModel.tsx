import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../layout";

const CreateRoomModal = ({ setIsModalOpen }: { setIsModalOpen: any }) => {
  const [roomName, setRoomName] = useState("");
  const ws = useContext(WebSocketContext);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ws.send(JSON.stringify({ type: "createRoom", roomName }));

    // After creating the room, request the updated list of rooms
    ws.send(JSON.stringify({ type: "requestRooms" }));
    setRoomName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="flex items-center justify-center h-screen w-screen ">
          <div className="bg-slate-700 p-4 rounded-lg text-white flex flex-col gap-4 w-1/3">
            <h2 className="text-xl">Create Room</h2>
            <hr></hr>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label htmlFor="roomName">Room Name:</label>
              <input
                className="bg-slate-800 rounded-l-md  px-4 py-4 text-white"
                type="text"
                id="roomName"
                placeholder="Enter room name"
                value={roomName}
                onChange={handleRoomNameChange}
              />
              <br></br>
              <div className="flex flex-row justify-between">
                <button
                  className="bg-slate-400 p-2 rounded-md"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="bg-cyan-500 p-2 rounded-md" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoomModal;
