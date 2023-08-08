import React from "react";
import {
  AiFillMessage,
  AiOutlineShareAlt,
  AiOutlineUpload,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { FaFile, FaShare } from "react-icons/fa";

const WhyChoose = () => {
  return (
    <div>
      <div className="overflow-y-hidden bg-gradient-to-b from-cyan-500 to-gray-100">
        <div className="xl:mx-auto xl:container  xl:px-20 md:px-6 px-4 py-12">
          <div className="lg:flex items-center justify-center lg:space-x-12 2xl:space-x-6 max-w-screen-2xl mx-auto">
            <div className>
              <p className="lg:text-4xl text-3xl font-extrabold leading-9 text-gray-100">
                See what sets Familyzone apart
              </p>
              <p className="text-lg leading-7 text-gray-200 mt-4 xl:w-7/12 w-full">
                You can share media files with your family members, chat
                realtime very easily.
              </p>
              <div className="lg:hidden lg:w-3/5 xl:w-3/5 w-full lg:mt-0 mt-6">
                <img
                  src="https://i.ibb.co/SKLJ7WX/austin-distel-jp-Hw8ndw-J-Q-unsplash-1.png"
                  alt="ongoing meeting"
                  className="w-full obejct-fit object-center object-fill h-full"
                />
              </div>
              <div className="mt-6 md:mt-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:mt-6 2xl:mt-12">
                <div className="flex items-center">
                  <div className="w-16 h-16 relative ">
                    <div className=" flex-shrink-0 z-20  w-16 h-16 flex items-center justify-center mt-2 mr-3 bg-cyan-500 rounded-md text-4xl text-gray-100">
                      <AiOutlineUpload></AiOutlineUpload>
                    </div>
                  </div>
                  <div className="flex items-start flex-col ml-6 pt-8">
                    <h2 className="text-lg font-semibold leading-4 text-gray-800">
                      Upload Media File
                    </h2>
                    <p className="lg:w-40 2xl:w-52 text-base leading-6 mt-2 text-gray-600">
                      Any type of media file can be uploaded.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 relative">
                    <div className=" flex-shrink-0 z-20  w-16 h-16 flex items-center justify-center mt-2 mr-3 bg-cyan-500 rounded-md text-4xl text-gray-100">
                      <AiOutlineUsergroupAdd></AiOutlineUsergroupAdd>
                    </div>
                  </div>
                  <div className="flex items-start flex-col ml-6 pt-8">
                    <h2 className="text-lg font-semibold leading-4 text-gray-800">
                      User Friendly
                    </h2>
                    <p className="lg:w-40 2xl:w-52 text-base leading-6 mt-2 text-gray-600">
                      Being user friendly has many benefits.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 relative">
                    <div className=" flex-shrink-0 z-20  w-16 h-16 flex items-center justify-center mt-2 mr-3 bg-cyan-500 rounded-md text-4xl text-gray-100">
                      <AiOutlineShareAlt></AiOutlineShareAlt>
                    </div>
                  </div>
                  <div className="flex items-start flex-col ml-6 pt-8">
                    <h2 className="text-lg font-semibold leading-4 text-gray-800">
                      Shareing Others
                    </h2>
                    <p className="lg:w-40 2xl:w-52 text-base leading-6 mt-2 text-gray-600">
                      Any file can be shared with others.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 relative">
                    <div className=" flex-shrink-0 z-20  w-16 h-16 flex items-center justify-center mt-2 mr-3 bg-cyan-500 rounded-md text-4xl text-gray-100">
                      <AiFillMessage></AiFillMessage>
                    </div>
                  </div>
                  <div className="flex items-start flex-col ml-6 pt-8">
                    <h2 className="text-lg font-semibold leading-4 text-gray-800">
                      Chating With Others
                    </h2>
                    <p className="lg:w-40 2xl:w-52 text-base leading-6 mt-2 text-gray-600">
                      The biggest advantage is that realtime chat can be done
                      here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
