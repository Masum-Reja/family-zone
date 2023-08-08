import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SinglePage from "./SinglePage";
import useAuth from "../../../hooks/useAuth";
import { filter } from "dom-helpers";
const Share = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [notifyCount, setNotifyCount] = useState(0);
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

  const allData = [];

  items?.map(function (item) {
    const b = item?.files?.map(function (element) {
      allData.push({
        _id: item._id,
        user_name: item.name,
        user_email: item.email,
        file_id: element.id,
        src: element.photo_url,
        stake_emails: element.shareEmails,
        created_at: element.created_at,
        file_name: element.file_name,
        format: element.format,
        resource_type: element.resource_type,
        bytes: element.bytes,
        version: element.version,
        height: element.height,
        width: element.width,
      });
    });
    return b;
  });

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // DELETE AN FILE
  const handleDeleteFile = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://family-server.malihatabassum.com/products/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Successfully Deleted!");
            const remainingFiles = items.filter(
              (product) => product._id !== id
            );
            setItems(remainingFiles);
          }
        });
    }
  };
  //filter data by email

  const filter_data = allData.filter((obj) => {
    return obj.stake_emails?.some((item) => item.shareEmail === user.email);
  });

  return (
    <div>
      <Toaster position="top-center" />
      {
        <div className="lg:grid-cols-4 grid-cols-2 xl:grid-cols-6 md:grid-cols-4 grid  gap-4">
          {filter_data?.map((item, index) => (
            <SinglePage
              handleDeleteFile={handleDeleteFile}
              item={item}
              index={index}
              key={index}
              {...item}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default Share;
