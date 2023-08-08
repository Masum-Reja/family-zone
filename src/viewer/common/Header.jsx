import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/img/familyzone-logo-2.png";
import { doc, onSnapshot } from "firebase/firestore";

import { database } from "../../service/config/firebase";
import useAuth from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";

export default function Header() {
  const [changeHeader, setChangeHeader] = useState(false);
  const { user, signOutUser } = useAuth();

  //header change function
  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  //change header by scrolling
  window.addEventListener("scroll", onChangeHeader);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // if (user) {
    //   const notificationsRef = database.ref(`notifications/${user.uid}`);
    //   const listener = notificationsRef.on("value", (snapshot) => {
    //     const count = snapshot.exists() ? snapshot.val().count : 0;
    //     setNotificationCount(count);
    //   });
    //   return () => {
    //     notificationsRef.off("value", listener);
    //   };
    // }
  }, []);

  const handleChatClick = () => {
    // TODO: Open chat interface
  };

  return (
    <header
      className={
        changeHeader
          ? "bg-cyan-600 fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-cyan-600 fixed z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
        {/* left  */}
        <Link to="/" className="flex flex-grow">
          <img className="w-44 cursor-pointer" src={logo} alt="logo" />
        </Link>

        <Link
          to="/about"
          className={
            changeHeader
              ? "text-gray-100 space-x-4  mr-5"
              : "text-gray-100 space-x-4  mr-5"
          }
        >
          {/* <div className="relative flex cursor-pointer">
            <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2"></span>
            <BsMessenger className="cursor-pointer w-6 h-6 text-gray-700" />
          </div> */}
        </Link>
        <div className="flex gap-2 mr-5 hidden lg:block md:block">
          <Link
            to="/"
            className={
              changeHeader
                ? "text-gray-100 space-x-4 pr-4"
                : "text-gray-100 space-x-4 pr-4"
            }
          >
            Home
          </Link>
          <Link
            to="/about"
            className={
              changeHeader
                ? "text-gray-100 space-x-4"
                : "text-gray-100 space-x-4"
            }
          >
            About
          </Link>
        </div>

        {/* right  */}
        {user.displayName ? (
          <>
            <div className="flex items-center justify-end space-x-4">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-gray-700 poppins hidden md:block lg:block">
                {user.displayName}
              </p>
              <FiLogOut
                className="cursor-pointer w-6 h-6 text-gray-700"
                onClick={signOutUser}
              />
            </div>
          </>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="flex items-center justify-end space-x-6"
            >
              <button className=" bg-orange-600 px-6 py-2.5 text-white poppins rounded ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105">
                Sign In
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
