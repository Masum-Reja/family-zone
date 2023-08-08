import React from "react";
import Chat from "../../../components/Chat";
import Sidebar from "../../../components/Sidebar";
import Back from "../../../service/Form/Back";
import Heading from "../../../service/Form/Heading";

const Message = () => {
  return (
    <div
      className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-20
"
    >
      <Back />
      <Heading heading="Chats" className="text-gray-100" />

      <div className="flex flex-col justify-center items-center ">
        <div className="rounded-lg rounded-bl-lg flex ">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Message;
