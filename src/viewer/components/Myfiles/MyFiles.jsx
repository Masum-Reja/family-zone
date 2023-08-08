import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Files from "./Files";
import { AiOutlineUpload } from "react-icons/ai";
import useFetch from "../../../hooks/useFetch";
import useUser from "../../../hooks/useUser";
import useProducts from "../../../hooks/useProducts";

const MyFiles = (props) => {
  const call = props.action;

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const { roomData } = useFetch();
  const { userData } = useUser();
  const { files } = useProducts();

  const found = userData?.filter((el) => el.email === user.email);

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
  const all_data = [];
  const found_products = items?.filter((el) => el.user_email === user.email);
  found_products?.map((element) =>
    element.files.map((data) => all_data.push(data))
  );

  const [allFiles, setData] = useState();
  const [passKey, setPassKey] = useState();

  function handleClick(id, roomKeys) {
    files
      ?.filter((file) => file.uuid === roomKeys)
      ?.map((data) => setData(data.files));

    setPassKey(roomKeys);
  }

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
    <div className="mt-[-24px]">
      <div className="max-w-screen-2xl mx-auto  px-4 ">
        <div class="flex my-4 rounded">
          <div class=" border-l px-2 flex justify-between h-screen ">
            <div className="mt-2">
              <Toaster position="top-center" />
              <div className=" flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-cyan-500 ">
                    My Gallery
                  </h1>
                  <span>Files ({all_data?.length})</span>
                </div>
                <div className="flex items-center  space-x-2"></div>
                {found && (
                  <Link
                    to="/add-file"
                    className="px-3 py-2 bg-cyan-500 text-gray-100 w-16 text-center"
                  >
                    <AiOutlineUpload className="text-3xl" />
                  </Link>
                )}
              </div>

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

export default MyFiles;
