import React, { useState, useEffect } from "react";

import RoomCard from "./RoomCard";
import { useHtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";

const RoomsList = ({ rooms }: any) => {
  useEffect(() => {
    console.log(rooms);
  }, [rooms]);
  return (
    <div className="rounded-md h-fit flex flex-col gap-2 overflow-y-scroll">
      {rooms ? (
        <>
          {" "}
          {rooms.map((room, index) => (
            <RoomCard key={room.roomId} room={room} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomsList;
