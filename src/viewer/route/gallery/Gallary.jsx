import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { AiOutlineUpload } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import useUser from "../../../hooks/useUser";
import Files from "../../components/Myfiles/Files";
import useAccessRoom from "../../../hooks/useAccessRoom";
import Back from "../../../service/Form/Back";
import Heading from "../../../service/Form/Heading";

const Gallary = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { roomData } = useFetch();
  const { userData } = useUser();
  const { roomAccessKey } = useAccessRoom();
  const all_data = [];
  const found = userData?.filter((el) => el.email === user.email);

  useEffect(() => {
    fetch(`https://family-server.malihatabassum.com/products/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result.files);
        },
        (error) => {}
      );
  }, [id]);

  // other room section end
  //*************************** */

  useEffect(() => {
    fetch("https://family-server.malihatabassum.com/products")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {}
      );
  }, []);

  const found_products = items?.filter((el) => el.user_email === user.email);
  found_products?.map((element) =>
    element.files.map((data) => all_data.push(data))
  );

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // DELETE AN FILE
  const action = "delete";
  const email = user.email;

  const handleDeleteFile = (item, id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    const data = {
      action,
      email,
      item,
    };
    if (proceed) {
      const url = `https://family-server.malihatabassum.com/products/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Successfully Deleted!");
          }
        });
    }
  };

  const emails = [];
  roomData?.map((ele) => ele?.roomMembers?.map((data) => emails.push(data)));

  return (
    <div className="max-w-screen-xl mx-auto px-2 py-16">
      <Heading heading="Gallery" />
      <Back />
      <div className="  px-4 my-10 ">
        <div className="flex items-center justify-between bg-orange-500 py-2.5 px-2">
          <div>
            <h1 className="text-3xl font-semibold text-gray-700 ">
              My Gallery
              {id === user.uid ? (
                <span className=" text-gray-700 text-xl">(me)</span>
              ) : (
                <span className="text-gray-700 text-xl">(shared)</span>
              )}
            </h1>
            {id === user.uid ? (
              <span className="text-gray-700">Files ({all_data?.length})</span>
            ) : (
              <span className="text-gray-700">Files ({data?.length})</span>
            )}
          </div>
          <div
            className={
              id === user.uid ? "flex items-center  space-x-2" : "hidden"
            }
          >
            <Link
              to="/add-files"
              className="px-3 py-2 bg-gray-500 rounded text-gray-100  text-center"
            >
              <AiOutlineUpload className="text-3xl" />
            </Link>
          </div>
        </div>
        <div class="flex border ">
          <div class=" border-l px-2 flex justify-between h-screen ">
            <div className="mt-2">
              <Toaster position="top-center" />

              <div>
                <>
                  {loading ? (
                    <div className=" py-10 flex items-center justify-center py-20">
                      <span className="text-3xl text-gray-500 font-semibold">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <div>
                      {id === user.uid ? (
                        <div>
                          {all_data?.length < 0 ? (
                            <div>You have not files here please upload </div>
                          ) : (
                            <div className="lg:grid-cols-6 grid-cols-2 md:grid-cols-5 grid xl:grid-cols-8 my-3 ">
                              {all_data?.map((item, index) => (
                                <Files
                                  handleDeleteFile={handleDeleteFile}
                                  item={item}
                                  index={index}
                                  key={index}
                                  {...item}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {data?.length < 0 ? (
                            <div>You have not files here please upload </div>
                          ) : (
                            <div className="lg:grid-cols-6 grid-cols-2 md:grid-cols-5 grid xl:grid-cols-8 my-3 ">
                              {data?.map((item, index) => (
                                <Files
                                  handleDeleteFile={handleDeleteFile}
                                  item={item}
                                  index={index}
                                  key={index}
                                  {...item}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
