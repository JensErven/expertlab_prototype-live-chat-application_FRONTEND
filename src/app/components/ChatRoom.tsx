import React, { useEffect } from "react";
import ChatRoomUsers from "./ChatRoomUsers";
import ChatInRoom from "./ChatInRoom";

const ChatRoom = ({ selectedRoom }: any) => {
  return (
    <div className="bg-slate-900 p-4 h-screen  flex flex-col gap-4 w-3/5">
      <>
        {selectedRoom !== undefined && (
          <>
            {" "}
            <ChatRoomUsers
              users={selectedRoom.users}
              roomName={selectedRoom.roomName}
            />
            <ChatInRoom selectedRoom={selectedRoom} />
          </>
        )}
      </>
    </div>
  );
};

export default ChatRoom;
