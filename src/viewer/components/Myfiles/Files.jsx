import React, { useState } from "react";

import ModalImage from "react-modal-image";

import {
  AiFillDelete,
  AiOutlineDownload,
  AiOutlineShareAlt,
} from "react-icons/ai";

const Files = ({ handleDeleteFile, _id, item, index }) => {
  const [showModal, setShowModal] = React.useState(false);

  //mulitple condition for audio, video, image and another files.
  let FileButton;

  FileButton = (
    <ModalImage
      small={item}
      large={item}
      alt={item}
      className="h-56 w-44 object-cover shadow "
    />
  );

  return (
    <div className="flex  items-center justify-center">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="rounded  m-2 shadow border-b bg-gray-500 ">
        <div className="item-baseline">
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

                    {/*body*/}

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
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>

        <div className="relative ...">
          <div>{FileButton}</div>
          <div className="absolute  -mt-8">
            <button
              onClick={() => handleDeleteFile(item, index + 0)}
              className="hover:text-red-500  "
            >
              <AiFillDelete className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;

// onClick={() => handleShareFile(_id + file_id)}
