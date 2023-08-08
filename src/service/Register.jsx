import React, { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../service/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import TextField from "./Form/TextField";
import Button from "./Form/Button";
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";
import logo from "../assets/img/familyzone-logo-2.png";
const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveUser = (email, displayName, uid, method) => {
    const roomKey = [uid];
    const user = { email, displayName, roomKey };
    fetch("https://family-server.malihatabassum.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            saveUser(email, displayName, uid, "POST");
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            swal("Good job!", "Account has been created!", "success");
            navigate("/");
          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-full bg-gray-100 mt-[-24px]">
      <div className="flex flex-col justify-center items-center h-screen">
        <form
          className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg bg-gradient-to-b from-cyan-500  to-gray-100"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center">
            <img src={logo} className="w-44" alt="" />
          </div>
          <div className="flex justify-center items-center py-8">
            <p
              tabIndex={0}
              role="heading"
              aria-label="Registation to your account"
              className="text-2xl font-bold leading-6 text-gray-600"
            >
              Sign Up
            </p>
          </div>
          <div className="flex flex-col space-y-6">
            <TextField required type="text" placeholder="Name" />
            <TextField required type="email" placeholder="Email" />
            <TextField required type="password" placeholder="Password" />

            {/* <TextField required style={{ display: "none" }} type="file" /> */}

            <label htmlFor="file" className="cursor-pointer">
              <input type="file" id="file" className="rounded-md" />
            </label>
          </div>
          <Button disabled={loading} text="Sign Up" />
          {loading && "Uploading and compressing the image please wait..."}
          <Link to="/sign-in">
            <p className="text-base text-cyan-500 text-center my-6 hover:underline ">
              Already have an account ?
            </p>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Register;
