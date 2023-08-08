import React from "react";
import { useState } from "react";
import { FaRegMehRollingEyes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUniqueRoom from "../../../hooks/useUniqueRoom";
import useAccessRoom from "../../../hooks/useAccessRoom";
import MainPage from "../../theLayout/MainPage";
import useFetch from "../../../hooks/useFetch";
const Tab = () => {
  const [openTab, setOpenTab] = useState(1);
  const { roomAccessKey } = useAccessRoom();

  const { user } = useAuth();
  const { uniqueRoomData } = useUniqueRoom();
  const { roomData } = useFetch();
  const [action, setAction] = useState(user.uid);
  const found = uniqueRoomData?.find((el) => el.email === user.email);

  // const my = "my_family";
  // const other = "shared_family";
  // if (openTab === 1) {
  //   action = my;
  // } else {
  //   action = other;
  // }
  const yourRoom = [];
  roomAccessKey?.map(function (key) {
    key.map((data) =>
      roomData
        ?.filter((e) => e.uid === data)
        ?.map((data) => yourRoom.push(data))
    );
  });
  // console.log(action);
  // console.log(yourRoom);
  console.log(openTab);
  let color;
  if (openTab === 1) {
    color = "cyan";
  }
  if (openTab === 2) {
    color = "orange";
  }
  if (openTab === 3) {
    color = "lime";
  }
  if (openTab === 4) {
    color = "green";
  }
  if (openTab === 5) {
    color = "indigo";
  }
  return (
    <div className={"max-w-screen-xl mx-auto px-2  "}>
      <div className="py-8">
        <div className="">
          <div className="flex justify-center items-center gap-2">
            {yourRoom?.map((data, index) => (
              <div className=" " onClick={() => setAction(data.uid)}>
                <a
                  onClick={() => setOpenTab(index + 1)}
                  href="#_"
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === index + 1
                      ? "text-white bg-" + color + "-600"
                      : "text-" + color + "-600 bg-white")
                  }
                >
                  <span class="relative group-hover:text-white">
                    {data?.roomName}
                  </span>
                </a>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col  break-words  w-full mb-6 srounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div id="link1">
                  <MainPage action={action} color={color} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
