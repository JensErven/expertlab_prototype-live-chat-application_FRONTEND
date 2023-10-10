"use client";
import { useState } from "react";
import Image from "next/image";
import Rooms from "./components/Rooms";
import ChatRoom from "./components/ChatRoom";
import CreateRoomModal from "./components/CreateRoomModel";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatRoomSelected, setChatRoomSelected] = useState(true);
  const [roomName, setRoomName] = useState("");

  return (
    <>
      <div className="flex flex-row h-screen">
        <Rooms setIsModalOpen={setIsModalOpen} />
        {chatRoomSelected && <ChatRoom />}

        {isModalOpen && (
          <>
            <CreateRoomModal setIsModalOpen={setIsModalOpen} />{" "}
          </>
        )}
      </div>
    </>
  );
}
