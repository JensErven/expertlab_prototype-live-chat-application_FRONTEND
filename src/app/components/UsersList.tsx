"use client";
import React, { useEffect } from "react";

const UsersList = ({ users }: any) => {
  return (
    <div className="rounded-md h-fit flex flex-col gap-2 overflow-y-scroll">
      {users ? (
        <>
          {" "}
          {users.map((user, index) => (
            <>
              <div>test</div>
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
