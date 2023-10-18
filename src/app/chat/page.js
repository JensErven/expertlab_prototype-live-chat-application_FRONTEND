"use client";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Rooms from "../components/Rooms";
import ChatRoom from "../components/ChatRoom";
import ChatToUser from "../components/ChatToUser";
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
  const router = useRouter();

  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [userOrRoomSelected, setUserOrRoomSelected] = useState("");
  // Retrieve the username from session storage
  const storedUsername = sessionStorage.getItem("username");
  function updateSelectedRoom(updatedRooms) {
    if (selectedRoom) {
      const updatedRoom = updatedRooms.find(
        (room) => room.roomId === selectedRoom.roomId
      );
      if (updatedRoom) {
        console.log("selected room gets updated.");
        setSelectedRoom(updatedRoom);
      }
    }
  }

  useEffect(() => {
    if (!ws) {
      router.push(`/error`);
    }
    ws.send(JSON.stringify({ type: "userListRequest" }));
    ws.send(JSON.stringify({ type: "requestRooms" }));
  }, []);
  useEffect(() => {
    if (!ws) {
      router.push(`/error`);
    } else if (ws) {
      // Send a request for the user list when the component mounts

      // Listen for server response
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.type === "roomList") {
          console.log("get updated roomlist");
          setRooms(response.rooms);
          updateSelectedRoom(response.rooms);
          // Check if selectedRoom is not empty
        } else if (response.type === "userLeftRoom") {
          console.log("user left a room");
          ws.send(JSON.stringify({ type: "userListRequest" }));
          ws.send(JSON.stringify({ type: "requestRooms" }));
          updateSelectedRoom(response.rooms);
          // if (selectedRoom) {
          //   // Find the room in rooms that matches the roomId in selectedRoom
          //   const updatedSelectedRoom = rooms.find(
          //     (room) => room.roomId === selectedRoom.roomId
          //   );

          //   // If the room is found, update selectedRoom
          //   if (updatedSelectedRoom) {
          //     setSelectRoom(updatedSelectedRoom);
          //   }
          // }
        } else if (response.type === "userJoinedRoom") {
          console.log(`${response.username} joined ${response.roomName}`);
          ws.send(JSON.stringify({ type: "requestRooms" }));
          updateSelectedRoom(response.rooms);
        } else if (response.type === "userListResponse") {
          // Handle the user list response
          setUsers(response.users);
        } else if (response.type === "roomDeleted") {
          ws.send(JSON.stringify({ type: "requestRooms" }));
          setRooms(response.rooms);
          updateSelectedRoom(response.rooms);
        } else if (response.type === "userClosedConnection") {
          ws.send(JSON.stringify({ type: "requestRooms" }));
        }
        // else if (response.type === "userJoinedRoom") {
        //   ws.send(JSON.stringify({ type: "userListRequest" }));
        //   if (selectedRoom) {
        //     // Find the room in rooms that matches the roomId in selectedRoom
        //     const updatedSelectedRoom = rooms.find(
        //       (room) => room.roomId === selectedRoom.roomId
        //     );

        //     // If the room is found, update selectedRoom
        //     if (updatedSelectedRoom) {
        //       setSelectRoom(updatedSelectedRoom);
        //     }
        //   }
        // }
      };
    }
  }, [ws, updateSelectedRoom, router]);

  useEffect(() => {
    console.log("selected room", selectedRoom);
  }, [selectedRoom]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setSelectRoom(room) {
    setSelectedRoom(room);
    setSelectedUser();
    setUserOrRoomSelected("room");

    // Refresh the room data for the selected room
    if (room) {
      const updatedRooms = rooms.map((r) => {
        if (r.roomId === room.roomId) {
          return room;
        }
        return r;
      });
      setRooms(updatedRooms);
    }
  }

  function setSelectUser(user) {
    console.log(user);

    setSelectedUser(user);
    setUserOrRoomSelected("user");
    setSelectedRoom();
  }

  return (
    <>
      <div className="flex flex-row h-screen">
        {" "}
        {isModalOpen && (
          <>
            <CreateRoomModal setIsModalOpen={setIsModalOpen} />{" "}
          </>
        )}
        <div className="flex flex-col gap-4 p-4 w-2/5 bg-slate-700 ">
          <Rooms
            setIsModalOpen={setIsModalOpen}
            username={storedUsername}
            rooms={rooms}
            setSelectRoom={setSelectRoom}
            selectedRoom={selectedRoom}
          />
          <hr className="border-slate-500 border"></hr>
          <Users
            users={users}
            setSelectedUser={setSelectUser}
            selectedUser={selectedUser}
          />
        </div>
        {selectedRoom || selectedUser ? (
          <>
            {" "}
            {userOrRoomSelected === "user" ? (
              <ChatToUser selectedUser={selectedUser} />
            ) : (
              <ChatRoom selectedRoom={selectedRoom} />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Page;
