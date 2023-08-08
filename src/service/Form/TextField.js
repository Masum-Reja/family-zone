import React from "react";

const TextField = ({ ...rest }) => {
  return (
    <>
      <input
        {...rest}
        required
        className="w-full px-4 py-2.5 rounded-md  ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl bg-gray-100"
      />
    </>
  );
};

export default TextField;
