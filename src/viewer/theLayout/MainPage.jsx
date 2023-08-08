import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

import {
  AiFillContacts,
  AiFillWechat,
  AiOutlineCalendar,
} from "react-icons/ai";
import { RiGalleryFill, RiTeamFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";

const MainPage = ({ action, color }) => {
  const percentages = -300;

  return (
    <div>
      <section className="max-w-screen-xl mx-auto px-2 py-5 ">
        <div className="flex justify-center items-center flex-col ">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-4 ">
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={`/gallery/${action}`}
            >
              <div className="card cursor-pointer">
                <div class="face face1">
                  <div class="content">
                    <h2 className="text-5xl">Gallary</h2>
                  </div>
                </div>
                <div class="face face2">
                  <h2 className="text-white text-gray-100">
                    <RiGalleryFill className={"text-" + color + percentages} />
                  </h2>
                </div>
              </div>
            </Link>
            {/* onClick={() => window.scrollTo(0, 0)} */}
            <a href="https://web.telegram.org" target="_blank" rel="noreferrer">
              <div className="card cursor-pointer">
                <div class="face face1">
                  <div class="content">
                    <h2 className="text-5xl">Message</h2>
                  </div>
                </div>
                <div class="face face2">
                  <h2 className="text-white text-gray-100">
                    <AiFillWechat className={"text-" + color + percentages} />
                  </h2>
                </div>
              </div>
            </a>

            <Link to={`/notes/${action}`} onClick={() => window.scrollTo(0, 0)}>
              <div className="card cursor-pointer">
                <div class="face face1">
                  <div class="content">
                    <h2 className="text-5xl">Note</h2>
                  </div>
                </div>
                <div class="face face2">
                  <h2 className="text-white text-gray-100">
                    <GiNotebook className={"text-" + color + percentages} />
                  </h2>
                </div>
              </div>
            </Link>

            <Link
              to={`/contacts/${action}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="card cursor-pointer">
                <div class="face face1">
                  <div class="content">
                    <h2 className="text-5xl">Contact</h2>
                  </div>
                </div>
                <div class="face face2">
                  <h2 className="text-white text-gray-100">
                    <AiFillContacts className={"text-" + color + percentages} />
                  </h2>
                </div>
              </div>
            </Link>
            <Link to="/calender" onClick={() => window.scrollTo(0, 0)}>
              <div className="card cursor-pointer">
                <div class="face face1">
                  <div class="content">
                    <h2 className="text-5xl">Calendar</h2>
                  </div>
                </div>
                <div class="face face2">
                  <h2 className="text-white text-gray-100">
                    <AiOutlineCalendar
                      className={"text-" + color + percentages}
                    />
                  </h2>
                </div>
              </div>
            </Link>
            <Link
              to={`/members/${action}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="card cursor-pointer">
                <div class="face face1">
                  <div class="content">
                    <h2 className="text-5xl">Members</h2>
                  </div>
                </div>
                <div class="face face2">
                  <h2>
                    <RiTeamFill className={"text-" + color + percentages} />
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
