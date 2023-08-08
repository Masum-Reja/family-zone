import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import useAuth from "../hooks/useAuth";
import { db } from "../service/config/firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    console.log(getChats);
    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="h-[605px] bg-gray-100">
      {Object?.entries(chats || {})
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => (
          <div
            className="flex gap-2 items-center border-gray-300  shadow-b hover:bg-gray-400 bg-gray-100 cursor-pointer w-full px-2 py-1 border-b  hover:text-gray-100"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1].userInfo.photoURL}
              alt=""
              className="h-6 w-6 rounded-full border-2"
            />
            <div className="userChatInfo  ">
              <span className="tracking-tighter text-sm text-gray-800">
                {chat[1].userInfo.displayName.split(" ")[0]}
              </span>
              <p className="text-[10px] text-gray-700 tracking-tightest">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
