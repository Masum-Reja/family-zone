import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { Link } from "react-router-dom";

const Nofile = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex items-center flex-col justify-center  py-28 px-6 md:px-24 md:py-20 lg:py-32 max-w-screen-2xl mx-auto">
        <p className="py-2 text-base text-gray-800">
          Sorry about that! Please visit our upload page to get where you need
          to go.
        </p>
        <div>
          <Link to="/add-files">
            <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-opacity-50 flex items-center gap-2">
              <span className="text-3xl">
                {" "}
                <AiOutlineUpload />
              </span>
              <span>Click here</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nofile;
