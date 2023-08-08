import React, { useState } from "react";
import {
  AiFillMessage,
  AiFillMinusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import {
  FaClosedCaptioning,
  FaCross,
  FaFacebookMessenger,
  FaPowerOff,
  FaStop,
  FaWindowMinimize,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import useAuth from "../../hooks/useAuth";
import SignIn from "../../service/SignIn";

export default function ChatWiget() {
  const [showModal, setShowModal] = React.useState(false);
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
  const { user } = useAuth();
  return (
    <>
      {user.displayName ? (
        <button onClick={() => setMdOptionsToggle(!mdOptionsToggle)}>
          <div className="fixed bottom-5 right-2 flex cursor-pointer text-white z-50">
            <span className="bg-green-500 p-3 font-bold rounded-full text-3xl cursor-pointer ">
              {mdOptionsToggle ? (
                <AiFillMessage />
              ) : (
                <AiFillMinusCircle></AiFillMinusCircle>
              )}
            </span>
          </div>
        </button>
      ) : (
        <Link to="/sign-in">
          <button>
            <div className="fixed bottom-5 right-2 flex cursor-pointer text-white z-50">
              <span className="bg-green-500 p-3 font-bold rounded-full text-3xl cursor-pointer ">
                <AiFillMessage />
              </span>
            </div>
          </button>
        </Link>
      )}

      <>
        <div className={user.displayName ? "block" : "hidden"}>
          <div className={`${mdOptionsToggle ? "hidden" : "flex"}  `}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed bottom-0 right-0 z-50 outline-none focus:outline-none  text-gray-700   ml-3 mb-20 lg:mr-2 md:mr-2">
              <div className="rounded-lg flex bg-green-500 h-[500px] lg:w-[500px] md:w-[500px] w-[350px] mr-1">
                <div className=" bg-green-600 rounded-tl-lg rounded-bl-lg">
                  <Sidebar />
                </div>
                <div className="">
                  <Chat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
