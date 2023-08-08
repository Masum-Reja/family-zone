import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosCloudDone } from "react-icons/io";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";

const AddFile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { files } = useProducts();
  const [loading, setLoading] = useState(false);
  const [images, setImageData] = useState(null);
  const user_email = user.email;
  const uid = user.uid;

  const exist = files?.filter((data) => data.user_email === user.email);

  const handleClick = () => {
    setLoading(true);
  };
  const action = "update";
  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dzkzgswqp",
        uploadPreset: "masum-preset",
      },

      (error, result) => {
        if (result.uw_event === true) {
          setLoading(false);
        }

        if (result.event === "queues-end") {
          setImageData(result.info.url);
          const files = result.info.files.map(
            (element) => element.uploadInfo.url
          );

          const new_files = {
            user_email,
            uid,
            files,
            action,
          };
          if (!exist.length) {
            fetch(`https://family-server.malihatabassum.com/products`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(new_files),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.acknowledged) {
                } else {
                  toast.error("This didn't work.");
                }
              });
          } else {
            fetch(
              `https://family-server.malihatabassum.com/products/${user.email}`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(new_files),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.acknowledged) {
                } else {
                  // toast.error("This didn't work.");
                }
              });
          }
        }

        if (result.event === "abort") {
          navigate(-1);
        }
      }
    );
    //open widget
    myWidget.open();
  }

  //loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Toaster />
      <div className="bg-gray-100 h-screen">
        <div className="flex justify-center items-center pt-40 max-w-screen-2xl mx-auto ">
          <div
            className="pt-3 flex gap-2 items-center justify-start"
            onClick={handleOpenWidget}
            id="upload_widget"
          >
            <label
              onClick={handleClick}
              class={
                images
                  ? "lg:w-64 md:w-64 w-full flex flex-col items-center px-4 py-6 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer bg-green-500 hover:text-white "
                  : "lg:w-64 md:w-64 w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white "
              }
            >
              {images === null ? (
                <svg
                  class="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
              ) : (
                <IoIosCloudDone className="text-4xl text-gray-100" />
              )}

              {images === null ? (
                <div class="mt-2 text-base leading-normal">
                  {loading === true ? (
                    <span>Loading...</span>
                  ) : (
                    <span>Select a file</span>
                  )}
                </div>
              ) : (
                <span class="mt-2 text-base leading-normal text-gray-100 hidden">
                  Uploaded Successfully
                </span>
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFile;
