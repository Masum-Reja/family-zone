import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../service/config/firebase";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
const Search = () => {
  const [username, setUsername] = useState("");
  const [op_user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { user } = useAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = () => {
    handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.uid > op_user.uid ? user.uid + op_user.uid : op_user.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create op_user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: op_user.uid,
            displayName: op_user.displayName,
            photoURL: op_user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", op_user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  const [allUser, setAlluser] = useState();
  useEffect(() => {
    const getMarkers = async () => {
      const q = query(collection(db, "users"));
      try {
        const querySnapshot = await getDocs(q);

        const postData = [];
        querySnapshot?.forEach((doc) => postData?.push({ ...doc?.data() }));
        setAlluser(postData);
      } catch (err) {
        setErr(true);
      }
    };
    getMarkers();
  }, []);

  return (
    <div className="search">
      <div className="searchForm flex">
        <input
          type="text"
          list="suggestions"
          placeholder="Search User"
          className="w-full py-2 bg-gray-200 outline-none px-4"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <button
          onClick={() => handleKey()}
          className=" px-1 text-sm bg-gray-700 text-gray-100 focus:bg-gray-800"
        >
          Search
        </button>
      </div>
      <datalist id="suggestions">
        {allUser?.map((e) => (
          <option value={e.displayName} />
        ))}
      </datalist>

      {err && <span>op_user not found!</span>}
      {op_user && (
        <div
          className="flex cursor-pointer gap-2 px-2 py-1 bg-gray-400 mt-2 mx-1 rounded-md"
          onClick={handleSelect}
        >
          <img src={op_user.photoURL} alt="" className="w-6 h-6 rounded-full" />
          <div className="userChatInfo ">
            <span className="text-gray-100">{op_user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
