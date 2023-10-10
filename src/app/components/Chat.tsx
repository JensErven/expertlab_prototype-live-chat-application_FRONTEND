import React from "react";

const Chat = () => {
  return (
    <div className="bg-slate-700 rounded-md  h-4/5 w-full flex flex-col">
      <div className="w-full p-2 h-[90%] flex flex-col gap-y-2 overflow-hidden justify-end">
        {/* <div className="flex flex-col">
          <p>
            <span className="text-slate-400 text-sm">
              Jens Erven Yesterday 21:52
            </span>
          </p>
          <div className="own-message text-white bg-slate-600 p-2 w-fit rounded-md">
            <p>test</p>
          </div>
        </div>
        <div className="flex flex-col self-end">
          <p>
            <span className="text-slate-400 text-sm">
              Jens Erven - Yesterday 21:52
            </span>
          </p>
          <div className="others-message text-white bg-slate-400 w-fit rounded-md p-2 self-end">
            <p>Lorem ipsum dolor sit.</p>
          </div>
        </div> */}
      </div>

      <div className="flex flex-row items-center justify-center  border-t-2 border-slate-500  p-2 h-[10%] gap-2">
        <input
          className="w-3/5 bg-slate-800 rounded-md h-full px-4 py-2 text-white"
          placeholder="write a message"
        ></input>
        <button className="bg-green-400 text-green-900 font-semibold h-full p-2 rounded-md w-2/5 capitalize ">
          send message
        </button>
      </div>
    </div>
  );
};

export default Chat;
