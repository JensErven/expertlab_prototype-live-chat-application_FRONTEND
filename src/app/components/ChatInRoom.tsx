import React, { useState, useEffect, useContext } from "react";
import { FaMicrophone, FaPaperPlane, FaRegPaperPlane } from "react-icons/fa";
import { WebSocketContext } from "../layout";

const ChatInRoom = ({ selectedRoom }: any) => {
  const ws = useContext(WebSocketContext);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const user = sessionStorage.getItem("username");

  const handleSendMessage = () => {
    // Send the chat message to the server
    if (messageInput) {
      ws.send(
        JSON.stringify({
          type: "chatInRoom",
          roomId: selectedRoom.roomId,
          message: messageInput,
        })
      );

      // Clear the message input
      setMessageInput("");
    }
  };

  // Handle the "Enter" key press to send the message
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      handleSendMessage();
    }
  };

  useEffect(() => {
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (
        messageData.type === "chat" &&
        messageData.roomId === selectedRoom.roomId
      ) {
        const isOwnMessage = messageData.sender === user;

        // Add the received chat message to your chatMessages state
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: messageData.sender,
            message: messageData.message,
            timestamp: messageData.timestamp,
            isOwnMessage,
          },
        ]);
      }
    };
  }, [ws, selectedRoom, user]);
  const handleMicrophoneClick = () => {
    console.log("test mic");
  };
  return (
    <div className="bg-slate-700 rounded-md  h-4/5 w-full flex flex-col  ">
      <div className="w-full p-2 h-[90%] flex flex-col gap-y-2  justify-end overflow-scroll">
        {/* <div className="flex flex-col self-end">
          <p>
            <span className="text-slate-400 text-sm">
              (You) Jens Erven 10/11/23 - 21:52
            </span>
          </p>
          <div className="own-message text-white bg-slate-600 p-2 w-fit rounded-md self-end">
            <p>test</p>
          </div>
        </div> */}
        {chatMessages.map((message, index) => (
          <div
            className={`flex flex-col max-w-1/2 ${
              message.isOwnMessage ? "self-end" : ""
            }`}
            key={index}
          >
            <p>
              <span className="text-slate-400 text-sm">
                {message.isOwnMessage ? "(You)" : message.sender} -{" "}
                {message.timestamp}
              </span>
            </p>
            <div
              className={`message text-white ${
                message.isOwnMessage
                  ? "own-message self-end bg-slate-600"
                  : "others-message"
              } bg-slate-400 w-fit rounded-md p-2`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-center  border-t-2 border-slate-500  p-2 h-[10%] gap-2">
        <input
          onKeyPress={handleInputKeyPress}
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="w-full bg-slate-800 rounded-md h-full px-4 py-2 text-white"
          placeholder="write a message..."
        ></input>
        {/* <button
          className="bg-slate-800 rounded-full h-full w-fit px-2"
          onClick={handleMicrophoneClick}
        >
          <FaMicrophone size={25} className="fill-slate-300" />
        </button> */}
        <button
          onClick={handleSendMessage}
          className="bg-green-400 font-semibold h-full p-2 rounded-md  capitalize w-fit px-4 "
        >
          <FaPaperPlane size={25} fill="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInRoom;
