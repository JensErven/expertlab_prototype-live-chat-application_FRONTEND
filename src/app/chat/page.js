"use client";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Rooms from "../components/Rooms";
import ChatRoom from "../components/ChatRoom";
import CreateRoomModal from "../components/CreateRoomModel";
import { WebSocketContext } from "../layout";
import { useRouter } from "next/navigation";
import Users from "../components/Users";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatRoomSelected, setChatRoomSelected] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const ws = useContext(WebSocketContext);

  // Retrieve the username from session storage
  const storedUsername = sessionStorage.getItem("username");

  useEffect(() => {
    if (!ws) return;
    ws.send(JSON.stringify({ type: "requestRooms" }));
    // Listen for server response
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "roomList") {
        console.log(response);
        setRooms(response.rooms);

        // Username registration was successful
        // Redirect to the chat page
      } else if (response.type === "userList") {
        // Update the user list
        setUsers(response.users);
      }
    };
  }, [ws]);

  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col gap-4 p-4 w-2/5 bg-slate-700 ">
        <Rooms
          setIsModalOpen={setIsModalOpen}
          username={storedUsername}
          rooms={rooms}
        />
        {/* <Users users={users} /> */}
      </div>

      {chatRoomSelected && <ChatRoom />}

      {isModalOpen && (
        <>
          <CreateRoomModal setIsModalOpen={setIsModalOpen} />{" "}
        </>
      )}
    </div>
  );
};

export default Page;
