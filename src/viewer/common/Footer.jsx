import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/familyzone-logo-2.png";
const Footer = () => {
  return (
    <footer class="p-4 shadow md:px-6 md:py-8 bg-cyan-600">
      <div class="sm:flex sm:items-center sm:justify-between max-w-screen-xl mx-auto ">
        <Link to="/" class="flex items-center mb-4 sm:mb-0">
          <img src={logo} class="mr-3 h-8" alt="Flowbite Logo" />
        </Link>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-100 sm:mb-0 dark:text-gray-400">
          <Link to="/about">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 text-gray-100 ">
                About
              </a>
            </li>
          </Link>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 text-gray-100">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 text-gray-100 ">
              Licensing
            </a>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-8" />
      <span class="block text-sm text-gray-100 sm:text-center ">
        © 2022{" "}
        <Link href="/" class="hover:underline">
          FamilyZone™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};
export default Footer;
