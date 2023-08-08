import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAccessRoom from "../../../hooks/useAccessRoom";
import useAuth from "../../../hooks/useAuth";
import Heading from "../../../service/Form/Heading";
import Back from "../../../service/Form/Back";

const Contacts = () => {
  const { key } = useParams();
  const [contacts, setContacts] = useState([]);
  const { user } = useAuth();
  const [action, setAction] = useState(false);
  const [id, setID] = useState();
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [defaultNumber, setDefaultNumber] = useState("");
  const email = user.email;
  const photoURL = user.photoURL;
  const displayName = user.displayName;
  const date = new Date().toString();

  useEffect(() => {
    fetch("https://family-server.malihatabassum.com/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const uid = key;
  const handleAddNote = () => {
    const newNote = {
      name,
      phone_number,
      displayName,
      uid,
      email,
      photoURL,
      date,
    };
    // setContacts([newNote, ...contacts]);

    fetch("https://family-server.malihatabassum.com/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully added the contacts.");
          setName("");
          setPhoneNumber("");
          setDefaultName("");
          setDefaultNumber("");
          window.location.reload();
        }
      });
  };

  const handleUpdate = (data) => {
    setDefaultName(data.name);
    setDefaultNumber(data.phone_number);
    setID(data._id);
    setAction(true);
  };

  const contact_name = name ? name : defaultName;
  const contact_number = phone_number ? phone_number : defaultNumber;

  const handleUpdateNotes = () => {
    const update = {
      contact_name,
      contact_number,
    };
    const url = `https://family-server.malihatabassum.com/contacts/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Update Successful");
          setAction(false);
          window.location.reload();
        }
      });
  };

  // DELETE AN USER
  const handleDeleteNotes = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://family-server.malihatabassum.com/contacts/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Deleted successfully");
            const remaining = contacts.filter((user) => user._id !== id);
            setContacts(remaining);
          }
        });
    }
  };
  // const found = contacts?.some((data) => data.email === user.email);

  return (
    <div>
      <div className="mx-auto container px-6 h-screen py-24">
        <Back />
        <Heading heading="Contacts Number" />
        <Toaster />
        <div className="flex flex-col items-center justify-center">
          <div className=" lg:w-[450px] w-full">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="Contact name"
              defaultValue={defaultName}
              onChange={(e) => setName(e.target.value)}
            />
            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 mt-2">
              <div class="px-2 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <input
                  id="contacts"
                  type="number"
                  defaultValue={defaultNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                  placeholder="Phone number"
                  required
                ></input>
              </div>
              <div class="flex items-center justify-end px-3 py-2 border-t border-gray-200 dark:border-gray-600">
                {action ? (
                  <button
                    type="submit"
                    onClick={() => handleUpdateNotes()}
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:bg-cyan-800"
                  >
                    Update Contact
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleAddNote}
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:bg-cyan-800"
                  >
                    Add Contacts
                  </button>
                )}

                <div class="flex pl-0 space-x-1 sm:pl-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-center items-center">
          <div>
            <table class="table-auto border border-gray-600 text-gray-700">
              <thead>
                <tr className="border-gray-600 ">
                  <th className="px-2 border border-gray-600 ">No.</th>
                  <th className="px-2 border border-gray-600">Name</th>
                  <th className="px-2 border border-gray-600">Number</th>
                  <th className="px-2 border border-gray-600">Call</th>
                  <th className="px-2 border border-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="border-gray-600">
                {contacts
                  .filter((data) => data.uid === key)
                  .map((data, index) => (
                    <tr className="px-2 border-gray-600 border">
                      <td className="px-2 border-gray-600 border">
                        {index + 1}
                      </td>
                      <td className="px-2 border-gray-600 border">
                        {data.name}
                      </td>
                      <td className="px-2 border-gray-600 border">
                        {data.phone_number}
                      </td>
                      <td className="px-2 border-gray-600 border">
                        <a href={`tel:+88${data.phone_number}`}>
                          {" "}
                          <FiPhoneCall className="text-green-500" />{" "}
                        </a>
                      </td>
                      <td className="px-2 border-gray-600 border">
                        <div className="flex gap-2">
                          <FaEdit
                            className="cursor-pointer"
                            onClick={() => handleUpdate(data)}
                          />
                          <AiFillDelete
                            className="cursor-pointer"
                            onClick={() => handleDeleteNotes(data._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

// import React from "react";

// const Contacts = () => {
//   return (
//     <div className="mx-auto container h-screen py-8">
//       <h1 className="text-center text-3xl">Contact Number</h1>
//       <div className="items-center flex justify-center mt-5 text-gray-700">

//       </div>
//     </div>
//   );
// };
