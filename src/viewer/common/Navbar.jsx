import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/family-zone-logo.jpg";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user, signOutUser, admin } = useAuth();

  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  return (
    <header
      className={
        changeHeader
          ? " fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-gray-900 fixed z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <nav class="max-w-screen-2xl mx-auto py-2.5 ">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" class="flex items-center">
            <img src={logo} class="h-6 mr-3 sm:h-9" alt="Family zone Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Family Zone
            </span>
          </Link>
          <div class="flex md:order-2">
            {user.displayName ? (
              <Link>
                <button
                  onClick={signOutUser}
                  type="button"
                  class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-3 md:mr-0 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  LogOut
                </button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <button
                  type="button"
                  class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-3 md:mr-0 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  class="block py-2 pl-3 pr-4 text-white bg-cyan-700 rounded md:bg-transparent md:text-cyan-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tabs"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
