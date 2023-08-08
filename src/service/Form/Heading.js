import React from "react";

const Heading = ({ text, heading }) => {
  return (
    <div class="container flex justify-center mx-auto pt-2">
      <div>
        <p class="text-gray-500 text-lg text-center font-normal pb-3">{text}</p>
        <h1 class="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6  mx-auto">
          {heading}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
