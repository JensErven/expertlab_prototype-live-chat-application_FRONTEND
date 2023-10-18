import React from "react";
import { FaSearch, FaUser, FaUserAlt } from "react-icons/fa";
import UsersList from "./UsersList";

const Users = ({ users, setSelectedUser, selectedUser }: any) => {
  return (
    <div className="h-1/2 flex flex-col gap-4   ">
      <div className="flex flex-row gap-4 items-center justify-between">
        {" "}
        <h1>Users</h1>
        <div className="flex gap-2 text-white bg-slate-800 p-2 rounded-lg">
          <p>{users.length}</p>
          <FaUser size={20} className="fill-slate-500" />
        </div>
      </div>
      <div className="flex flex-row items-center w-full">
        <input
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-[80%]"
          placeholder="search user..."
        ></input>
        <div className="p-2 flex bg-slate-800 rounded-r-md  h-full items-center  w-[20%] justify-center">
          <FaSearch size={20} className="fill-slate-600" />
        </div>
      </div>

      <UsersList
        users={users}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Users;
