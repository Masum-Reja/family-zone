import React, { useState } from "react";
import ModalImage from "react-modal-image";
import { FaExchangeAlt, FaShareAlt } from "react-icons/fa";
import {
  AiFillDelete,
  AiOutlineDownload,
  AiOutlineShareAlt,
} from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

import axios from "axios";
import { Document, Page } from "react-pdf";
const SinglePage = ({
  handleDeleteFile,
  _id,
  file_name,
  file_id,
  format,
  resource_type,
  src,
  user_name,
  file_email,
  stake_emails,
}) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [shareEmail, setMessage] = useState([]);

  const [allEmail, setEmail] = useState(null);
  const url = "https://family-server.malihatabassum.com/users";
  React.useEffect(() => {
    axios.get(url).then((response) => {
      setEmail(response.data);
    });
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  const handleShareFile = (id) => {
    const emailData = [
      {
        shareEmail,
      },
    ];
    const url = `https://family-server.malihatabassum.com/products/${id}`;
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
          toast.success("Successfully Shared!");
          setShowModal(false);
        } else {
          toast.error("This didn't work.");
        }
      });
  };

  //mulitple condition for audio, video, image and another SinglePage.
  let FileButton;
  if (resource_type === "image" && format != "pdf") {
    FileButton = (
      <ModalImage
        className={
          resource_type === "image"
            ? "block  h-56 w-48 border-none  "
            : "hidden"
        }
        small={src}
        large={src}
        alt={file_name}
      />
    );
  }
  if (resource_type === "video") {
    FileButton = (
      <div>
        <iframe
          className="h-56 w-56"
          src={src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="true"
        ></iframe>
      </div>
    );
  }
  if (resource_type === "video") {
    FileButton = (
      <div>
        <iframe
          className="h-56 w-56"
          src={src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="true"
        ></iframe>
      </div>
    );
  }

  if (format === "mp3") {
    FileButton = (
      <div>
        <iframe
          className="h-56 w-56"
          src={src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="true"
        ></iframe>
      </div>
    );
  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (format === "pdf") {
    FileButton = (
      <div>
        <Document url={src} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }

  return (
    <div className="flex  items-center justify-center">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="rounded  m-2 shadow border-b bg-gray-500 ">
        <div className="px-2 hover:bg-cyan-500 hover:text-gray-100 border-t border-gray-500  text-gray-100  item-baseline">
          {/* <h1 className="text-sm cursor-pointer">{file_name.slice(0, 15)}</h1> */}
        </div>

        <>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold text-gray-500">
                        Share "{file_name.slice(0, 10)}"
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <datalist id="usersEmail">
                        {allEmail.map((item) => (
                          <option value={item.email} />
                        ))}
                      </datalist>

                      <input
                        onChange={handleChange}
                        required
                        type="email"
                        list="usersEmail"
                        placeholder="Add people people (type email)"
                        className="my-4 text-slate-500 text-sm  leading-relaxed rounded bg-gray-100 w-full py-3 px-2"
                      ></input>
                      <h1 className="text-gray-600 text-xl">
                        People with access
                      </h1>

                      <div className="flex justify-between items-center text-gray-600 py-3">
                        <div className="flex items-cneter justify-center gap-1">
                          <img
                            className="h-8 w-10"
                            src="https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png"
                            alt=""
                          />
                          <div>
                            <h1 className="text-sm">{user_name}</h1>
                            <h1 className="text-[10px]">{file_email}</h1>
                          </div>
                        </div>
                        <h1>Owner</h1>
                      </div>
                      <hr />
                      <div className="text-gray-600">
                        <h1 className="text-gray-600 text-md">
                          Shared With{" "}
                          <span className="text-gray-500 font-semibold">
                            {stake_emails?.length.toFixed()}
                          </span>
                        </h1>
                        <ol className="text-[8px] ">
                          {stake_emails.map((item) => (
                            <li>{item?.shareEmail}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div></div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>

                      <button
                        className="bg-cyan-500 text-gray-200 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleShareFile(_id + file_id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>

        <div>
          <div>{FileButton}</div>
        </div>

        <div
          className={
            resource_type === "video"
              ? "flex space-x-2 justify-end py-1.5 text-xl text-gray-100 px-2"
              : "flex space-x-2 justify-between py-1.5 text-xl text-gray-100 px-2"
          }
        >
          <a
            href={src}
            className={
              resource_type === "video"
                ? "hidden hover:text-cyan-500"
                : "block hover:text-cyan-500"
            }
          >
            <AiOutlineDownload />
          </a>

          <div className="flex space-x-2 justify-end">
            {/* <button className="hover:text-cyan-500">
              <BiRename />
            </button> */}
            <button
              onClick={() => setShowModal(true)}
              className="hover:text-cyan-500"
            >
              <AiOutlineShareAlt />
            </button>
            <button
              onClick={() => handleDeleteFile(_id + file_id)}
              className="hover:text-red-500"
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;

// onClick={() => handleShareFile(_id + file_id)}
