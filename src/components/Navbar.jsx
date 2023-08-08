import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../service/config/firebase";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import logo from "../assets/img/familyzone-logo-2.png";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className=" text-white clas
    px-2 py-2.5 bg-cyan-500 rounded-tl-lg  "
    >
      <div className="flex justify-between items-center gap-1">
        <img src={logo} alt="" className="w-[108px]" />
      </div>
    </div>
  );
};

export default Navbar;
