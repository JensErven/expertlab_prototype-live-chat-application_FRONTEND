"use client";
import React, { use, useEffect } from "react";
import UserCard from "./UserCard";

const UsersList = ({ users, setSelectedUser, selectedUser }: any) => {
  const currentUser = sessionStorage.getItem("username");
  useEffect(() => {
    console.log("current user logged in", currentUser);
    console.log("all users that are logged in", users);
  }, [users, currentUser]);
  return (
    <div className="rounded-md h-fit flex flex-col gap-2 overflow-y-scroll">
      {users ? (
        <>
          {" "}
          {users.map((user, index) => (
            <>
              {currentUser !== user && (
                <UserCard
                  user={user}
                  key={index}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              )}
            </>

            // <RoomCard key={index} roomName={roomName[0]} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UsersList;
