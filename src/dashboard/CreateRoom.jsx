import React, { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../service/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import TextField from "../service/Form/TextField";
import swal from "sweetalert";
import logo from "../assets/img/familyzone-logo-2.png";
import Button from "../service/Form/Button";

const CreateRoom = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveUser = (email, displayName, uid, photoURL, method) => {
    const roomKeys = [uid];
    const user = { email, displayName, roomKeys, photoURL };
    fetch("https://family-server.malihatabassum.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  const saveRoomDetails = (roomName, email, displayName, uid, method) => {
    const roomMembers = [];
    const user = { roomName, email, displayName, roomMembers, uid };
    fetch("https://family-server.malihatabassum.com/rooms", {
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
    const roomName = e.target[0].value;
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {
      // //Create user
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      // const uid = res.user.uid;
      // const photoURL = file;
      // //Create a unique image name
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((res) => {
      //     saveUser(email, displayName, uid, photoURL, "POST");
      //     saveRoomDetails(roomName, email, displayName, uid, "POST");
      //     // save user to the database
      //     saveUser(email, displayName, "POST");

      //     updateProfile(auth.currentUser, {
      //       displayName: displayName,
      //       photoURL: photoURL,
      //     }).then(() => {
      //       swal("Good job!", "Account has been created!", "success");
      //       navigate("/");
      //     });
      //   })
      //   .catch((err) =>
      //     swal("Something went wrong!", `${err.message}`, "error")
      //   );

      //sign up functionality

      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // save user to the database
          console.log(res);
          const uid = res.user.uid;
          console.log(uid);
          const photoURL = res.user.photoURL;
          saveUser(email, displayName, uid, photoURL, "POST");
          saveRoomDetails(roomName, email, displayName, uid, "POST");
          updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
          }).then(() => {
            swal("Good job!", "Account has been created!", "success");
            navigate("/");
          });
          console.log(res);
        })
        .catch((err) =>
          swal("Something went wrong!", `${err.message}`, "error")
        );
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 h-screen flex flex-col justify-center items-center">
      <form
        className={
          loading
            ? " w-96 mt-6 p-4 rounded-lg shadow-lg bg-gradient-to-b from-cyan-500  to-gray-100 relative opacity-50 "
            : "bg-white w-96 mt-6 p-4 rounded-lg shadow-lg bg-gradient-to-b from-cyan-500  to-gray-100 relative"
        }
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center pb-5">
          <img src={logo} className="w-44" alt="" />
        </div>

        <div className="flex flex-col space-y-6">
          <TextField required type="text" placeholder="Your Room Name" />
          <TextField required type="text" placeholder="Your Full Name" />
          <TextField
            required
            type="email"
            placeholder="Email"
            className="lowercase"
          />
          <TextField required type="password" placeholder="Password" />
        </div>
        <Button
          disabled={loading}
          text={loading ? "Creating..." : "Create Room"}
        />

        {loading && (
          <div
            role="status"
            class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 opacity-100"
          >
            <svg
              aria-hidden="true"
              class={
                loading &&
                "w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-cyan-500 opacity-100"
              }
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
        <Link to="/sign-in">
          <p className="text-base text-cyan-500 text-center my-6 hover:underline ">
            Already have room ?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default CreateRoom;
