import React from "react";
import { FaSearch } from "react-icons/fa";
import UsersList from "./UsersList";

const Users = ({ users }: any) => {
  return (
    <div className="h-1/2 flex flex-col gap-4   ">
      <div className="flex flex-row gap-4 items-center justify-between">
        {" "}
        <h1>Users</h1>
      </div>
      <div className="flex flex-row items-center w-full">
        <input
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-[80%]"
          placeholder="search room..."
        ></input>
        <div className="p-2 flex bg-slate-500 rounded-r-md  h-full items-center  w-[20%] justify-center">
          <FaSearch size={20} fill="white" />
        </div>
      </div>
      <hr className="border-slate-500 border"></hr>
      <UsersList users={users} />
    </div>
  );
};

export default Users;
