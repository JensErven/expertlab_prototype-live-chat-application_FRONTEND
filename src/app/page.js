"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { WebSocketContext } from "./layout"; // Import WebSocketContext

export default function UsernameVerify() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const ws = useContext(WebSocketContext); // Access WebSocket from context

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ws) return;

    // Send a message to the server to register the username
    ws.send(JSON.stringify({ type: "name", username }));

    // Listen for server response
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "userRegistered") {
        // Store the username in session storage
        sessionStorage.setItem("username", username);
        // Username registration was successful
        // Redirect to the chat page
        router.push(`/chat`);
      }
    };
    // Do something with the roomName, e.g., send it to a parent component or perform an action.
    // console.log("username:", username);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen gap-y-4 ">
        <h1 className="flex flex-row items-center gap-2">Welcome</h1>
        <div className="bg-slate-700 p-4 rounded-lg text-white flex flex-col gap-4 w-1/3">
          <h2 className="text-xl">Enter your username to continue</h2>
          <hr></hr>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              id="userName"
              className="bg-slate-800  rounded-md px-4 py-4 text-white"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="bg-cyan-500 p-2 rounded-md">
              Start Chatting
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
