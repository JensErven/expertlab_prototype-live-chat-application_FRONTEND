import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../layout";

const ChatToUser = ({ selectedUser }) => {
  const ws = useContext(WebSocketContext);
  const user = sessionStorage.getItem("username");
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!ws) return;
    if (messageInput) {
      ws.send(
        JSON.stringify({
          type: "chatToUser",
          sender: user,
          receiver: selectedUser,
          message: messageInput,
        })
      );

      // Clear the message input
      setMessageInput("");
    }
  };

  useEffect(() => {
    if (!ws) return;
  }, [ws, selectedUser]);

  return <div className="text-white">{selectedUser}</div>;
};

export default ChatToUser;
