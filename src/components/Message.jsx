import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import useNotify from "../hooks/useNotify";

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [myObject, setMyObject] = useState({
    new_message: message.text,
    date: message.date,
  });

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sec = message.date.seconds;
  const currentDate = new Date(sec * 1000);
  const d = currentDate.toString().slice(16, 18);
  const hour = d % 12;
  const minute = currentDate.toString().slice(19, 21);

  useEffect(() => {
    if (message?.senderId !== user?.uid) {
      setMyObject({ new_message: message.text, date: message.date });
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`flex justify-start item-center ${
        message.senderId === user?.uid && "flex flex-row-reverse "
      }`}
    >
      <div className="flex-col">
        <img
          src={
            message.senderId === user?.uid ? user.photoURL : data.user.photoURL
          }
          alt=""
          className="h-6 w-6 rounded-full"
        />
        <span className="text-[10px]">
          {hour}:{minute}
        </span>
      </div>
      <div className="messageContent">
        <p
          className={`border px-2 rounded-b-xl rounded-r-xl bg-green-200 ${
            message.senderId === user.uid &&
            "border px-2 rounded-b-xl rounded-l-xl bg-green-200"
          }`}
        >
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
