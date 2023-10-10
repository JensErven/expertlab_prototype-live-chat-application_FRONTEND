import React from "react";
import ChatRoomUsers from "./ChatRoomUsers";
import Chat from "./Chat";

const ChatRoom = () => {
  return (
    <div className="bg-slate-900 p-4 h-screen  flex flex-col gap-4 w-3/5">
      <ChatRoomUsers />
      <Chat />
    </div>
  );
};

export default ChatRoom;
