import React, { useContext } from "react";
import Cam from "../assets/img/cam.png";
import Add from "../assets/img/add.png";
import More from "../assets/img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="lg:mx-auto md:mx-auto mr-1">
      <div className="flex justify-between items-center px-2 bg-cyan-500 border-l rounded-tr-lg">
        <div className="flex gap-2">
          <span>
            <img
              src={data.user?.photoURL}
              alt=""
              className="h-6 w-6 rounded-full"
            />
          </span>
          <span className="text-white text-sm">{data.user?.displayName}</span>
        </div>
        <div className="flex">
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
