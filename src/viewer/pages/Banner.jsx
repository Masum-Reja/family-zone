import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import img from "../../assets/img/familyzone-banner-photo.png";
const Banner = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { user } = useAuth();
  return (
    <section className="h-105 w-full  bg-cyan-200 py-10">
      <div className="flex flex items-center justify-between h-full max-w-screen-xl mx-auto px-6  lg:flex-row py-24 lg:pt-24 md:py-0 md:flex-row flex-col ">
        <div className="lg:px-0 md:px-0 px-4 ">
          <div className="block lg:hidden md:hidden items-center flex justify-center pb-6">
            <img src={img} alt="" className="h-44" />
          </div>
          <p class="lg:text-4xl md:text-3xl text-3xl font-semibold md:text-left text-center text-gray-700">
            Stay in touch with family
          </p>
          <p class="text-base text-gray-600 max-w-[624px] w-full mt-6 md:text-left text-center">
            Family zone is an internationally available freeware,
            cross-platform, use Family Zone to stay in touch with friends and
            family, anytime and anywhere
          </p>

          <Link
            to="/create-room"
            className="flex items-center lg:justify-start md:justify-start justify-center"
          >
            <button class="bg-orange-600 text-base font-medium lg:max-w-[205px] md:max-w-[205px] w-44 px-3 py-3 text-white mt-11 hover:bg-gray-700 transition duration-300 ease-in-out lg:block md:hidden blocl">
              Get Started!
            </button>
          </Link>
        </div>

        <div className="hidden lg:block md:block">
          <img src={img} alt="" className="h-72" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
