import React from "react";

const OurUser = () => {
  return (
    <div className="bg-gray-100">
      <div class="max-w-screen-xl mx-auto md:px-6 px-4 py-12">
        <div class="pb-20">
          <div class="mx-auto bg-gradient-to-l from-cyan-600 to-cyan-700 h-96">
            <div class="mx-auto container w-full flex flex-col justify-center items-center">
              <div class="flex justify-center items-center flex-col">
                <div class="mt-20">
                  <h2 class="lg:text-6xl md:text-5xl text-4xl font-black leading-10 text-white">
                    By the numbers
                  </h2>
                </div>
                <div class="mt-6 mx-2 md:mx-0 text-center">
                  <p class="lg:text-lg md:text-base leading-6 text-sm text-white">
                    2 years, consistent quality and you get results. No matter
                    what
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mx-auto container md:-mt-28 -mt-20 flex justify-center items-center">
            <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-2 gap-y-2 lg:gap-x-6 md:gap-x-6 md:gap-y-6 md:gap-y-6">
              <div class="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                <h2 class="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  40+
                </h2>
                <p class="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  Happy User
                </p>
              </div>
              <div class="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                <h2 class="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  540+
                </h2>
                <p class="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  File Storage
                </p>
              </div>
              <div class="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                <h2 class="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  300
                </h2>
                <p class="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  Family Members
                </p>
              </div>
              <div class="flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56 bg-white shadow rounded-2xl">
                <h2 class="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  2500+
                </h2>
                <p class="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  Daily chat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurUser;
