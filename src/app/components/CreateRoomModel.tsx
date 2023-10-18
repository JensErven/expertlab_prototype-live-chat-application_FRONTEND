import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../layout";
import { useRouter } from "next/navigation";

const CreateRoomModal = ({ setIsModalOpen }: { setIsModalOpen: any }) => {
  const [roomName, setRoomName] = useState("");
  const [createRoomError, setCreateRoomError] = useState("");
  const ws = useContext(WebSocketContext);
  const router = useRouter();

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
  };

  useEffect(() => {
    if (!ws) {
      router.push(`/error`);
    } else if (ws) {
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.type === "roomNameExists") {
          setCreateRoomError(
            `a room with the roomname '${response.roomName}' already exists. Please provide another roomname.`
          );
        } else if (response.type === "roomCreated") {
          setCreateRoomError("");
          setRoomName("");
          ws.send(JSON.stringify({ type: "requestRooms" }));
          setIsModalOpen(false);
        }
      };
    }
  }, [ws, router, setIsModalOpen]);

  return (
    <>
      <div className="modal-overlay h-screen">
        <div className="flex items-center justify-center h-screen w-screen ">
          <div className="bg-slate-700 p-4 rounded-lg text-white flex flex-col gap-4 w-2/3 md:w-1/2 lg:w-1/4 xl:w-1/5 ">
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
            {createRoomError !== "" && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{createRoomError}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoomModal;
