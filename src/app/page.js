"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WebSocketContext } from "./layout"; // Import WebSocketContext

export default function UsernameVerify() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (!ws) return;

    // Listen for server response, including the "welcome" message
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "userRegistered") {
        // Store the username in session storage
        sessionStorage.setItem("username", username);
        // Username registration was successful
        // Redirect to the chat page
        router.push(`/chat`);
      } else if (response.type === "usernameExists") {
        // Display an error message if the username already exists
        setError(
          `Username '${response.username}' already in use. Please choose a different one.`
        );
      } else if (response.type === "welcome") {
        // Update the "message" state with the welcome message
        setMessage(response.message);
      }
    };
  }, [ws, username, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the username is not empty string
    if (username === "") return;
    // check if there is a ws connection, if not then return and dont execute the register of the user.
    if (!ws) return;

    // Send a message to the server to register the username
    ws.send(JSON.stringify({ type: "name", username }));
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen gap-y-4 ">
        <h1 className="flex flex-row items-center gap-2">Welcome</h1>
        <div className="bg-slate-700 p-4 rounded-lg text-white flex flex-col gap-4 w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/5">
          {message !== "" ? <h2 className="text-xl">{message}</h2> : <></>}

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
          {error !== "" && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
