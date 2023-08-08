import React, { useState } from "react";
import TextField from "../../../service/Form/TextField";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import useUser from "../../../hooks/useUser";
import { toast, Toaster } from "react-hot-toast";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import Back from "../../../service/Form/Back";
import Heading from "../../../service/Form/Heading";

const AddFamilyMember = () => {
  const { key } = useParams();
  const { user } = useAuth();
  const { roomData } = useFetch();
  const { userData } = useUser();
  const [userEmail, setFirstName] = useState("");
  const [error, setError] = useState(null);

  function isValidEmail(userEmail) {
    return /\S+@\S+\.\S+/.test(userEmail);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setFirstName(event.target.value);
  };

  const filterData = roomData?.filter((e) => e.uid === key);
  const members = [];
  console.log(user.uid);
  filterData?.map((data) =>
    data.roomMembers?.map(function (data) {
      roomData
        .filter((e) => e.email === data)
        .map((data) =>
          members.push({
            email: data.email,
            displayName: data.displayName,
            roomName: data.roomName,
            _id: data._id,
          })
        );
    })
  );

  const found = userData?.some((el) => el.email === userEmail);
  const filterUser = members?.some((e) => e.email === userEmail);

  const handleAddEmail = (id, uid) => {
    const emailData = {
      userEmail,
    };

    if (!filterUser && isValidEmail) {
      if (found) {
        const url = `https://family-server.malihatabassum.com/rooms/${id}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(emailData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.lastErrorObject.updatedExisting === true) {
              const key = { userEmail };
              const api = `https://family-server.malihatabassum.com/users/${uid}`;
              fetch(api, {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(key),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.lastErrorObject.updatedExisting === true) {
                    swal(
                      "Good job!",
                      "Successfully added this Email!",
                      "success"
                    );
                    window.location.reload();
                  } else {
                    toast.error("This didn't work.");
                  }
                });
            } else {
              toast.error("This didn't work.");
            }
          });
      } else {
        toast.error(
          "The user did not registration, Please enter a valid user email"
        );
      }
    } else {
      toast.error("This user already added in your room");
    }
  };

  const action = "delete";
  const email = user.email;
  const roomKey = user.uid;
  const handleDeleteFile = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    const data = {
      action,
      email,
      roomKey,
    };
    if (proceed) {
      const url = `https://family-server.malihatabassum.com/rooms/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Successfully Deleted!");
            window.location.reload();
          }
        });
    }
  };

  return (
    <div className="py-24 max-w-screen-xl mx-auto px-2 h-screen">
      <Back />
      <Toaster position="top-center" reverseOrder={false} />
      <Heading heading="Room Members" />
      {/* <h1 className="text-center">Members: {members?.length}</h1> */}
      {filterData?.map((data) => (
        <div>
          {data.uid === user.uid ? (
            <div className="flex flex-col items-center py-5 ">
              <div className="">
                <TextField
                  name="firstName"
                  type="email"
                  value={userEmail}
                  placeholder="Enter valid email"
                  onChange={handleChange}
                />
                <button
                  className="bg-cyan-500 w-full text-gray-100 py-2.5 focus:bg-orange-600 hover:bg-cyan-600 "
                  onClick={() => handleAddEmail(data._id, user.uid)}
                >
                  Add Member
                </button>
              </div>
              {error && <h2 style={{ color: "red" }}>{error}</h2>}
            </div>
          ) : null}

          <div>
            <div class="mb-16">
              <div class="w-full bg-gray-100 px-10 pt-10">
                <div class="container mx-auto">
                  <div
                    role="list"
                    aria-label="Behind the scenes People "
                    class="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around "
                  >
                    {members?.map((data, index) => (
                      <div
                        role="listitem"
                        class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5 "
                      >
                        <div class="rounded overflow-hidden shadow-md bg-white">
                          <div class="absolute -mt-20 w-full flex justify-center">
                            <div class="h-32 w-32">
                              <img
                                src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                alt="Display Pi"
                                class="rounded-full object-cover h-full w-full shadow-md"
                              />
                            </div>
                          </div>
                          <div class="px-6 mt-16">
                            <h1 class="font-bold text-3xl text-center mb-1">
                              {data.displayName}
                            </h1>
                            <p class="text-gray-800 text-sm text-center mb-4">
                              {data.email}
                            </p>
                            <p class="text-gray-800 text-sm text-center mb-4">
                              Creator of{" "}
                              <span className="font-semibold">
                                {data.roomName}
                              </span>
                            </p>
                            <div className="text-center pb-5">
                              <button
                                onClick={() => handleDeleteFile(data.email)}
                                className="bg-gray-800 py-2 px-2 text-gray-100 hover:bg-red-500 focus:bg-red-700 rounded"
                              >
                                Delete Member
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddFamilyMember;
