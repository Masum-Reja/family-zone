import React from "react";
import { useNavigate } from "react-router-dom";

const Back = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-xl mx-auto px-2">
      <button
        onClick={() => navigate(-1)}
        class="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-md ml-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
        Back
      </button>
    </div>
  );
};

export default Back;
