import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import useUser from "../../hooks/useUser";
import useFetch from "../../hooks/useFetch";
import useProducts from "../../hooks/useProducts";
import useAuth from "../../hooks/useAuth";
import useUniqueRoom from "../../hooks/useUniqueRoom";
import { getAuth } from "firebase/auth";

const FamilyMembers = () => {
  const { roomData } = useFetch();
  const { userData } = useUser();
  const { files } = useProducts();
  const [data, setData] = useState();

  const { user } = useAuth();

  // const filter_data = allData.filter((obj) => {
  //   return obj.stake_emails?.some((item) => item.shareEmail === user.email);
  // });

  const emails = [];
  roomData?.map((ele) => ele?.roomMembers?.map((data) => emails.push(data)));

  function handleClick(id, roomKeys) {
    files.filter(function (data) {});
  }

  const matchUser = [];

  function add(emails) {
    userData?.map(function (data) {
      const found = emails?.some((el) => el === data.email);
      if (found)
        matchUser.push({
          status: "YES",
          userEmail: data.email,
          title: data.displayName,
          roomKeys: data.roomKeys,
        });
      // if (!found) matchUser.push({ status: "NO", userEmail: data?.email });
    });

    return matchUser;
  }

  add(emails);

  return (
    <div>
      <div className="bg-cyan-400 w-full px-2 text-center text-gray-100 py-2.5 mb-2 flex items-center jsutify-center gap-2">
        <span className="text-2xl">
          {" "}
          <AiOutlineUserAdd />
        </span>{" "}
        <span>My Family</span>
      </div>
      <ol className="flex flex-col gap-2 mx-2">
        {userData?.map((data) => (
          <li className="flex gap-2 items-center">
            <div className="flex flex-col">
              <button onClick={() => handleClick(data._id, data.roomKeys)}>
                {data.roomName}
              </button>
              {/* {data.status === "YES" ? (
                  <span className="text-[8px] px-2  font-bold text-gray-100 bg-green-400 rounded gap-2 ">
                    {data.userEmail.substring(0, data.userEmail.indexOf("@"))}
                    {user.email === data.userEmail && (
                      <span className="text-gray-700 pl-1">(creator)</span>
                    )}
                  </span>
                ) : (
                  <span className="text-[8px] text-red-600">
                    Not Created Account{" "}
                  </span>
                )} */}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FamilyMembers;
