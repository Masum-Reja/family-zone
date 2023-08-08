import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import useAccessRoom from "../../../hooks/useAccessRoom";
import useAuth from "../../../hooks/useAuth";
import Back from "../../../service/Form/Back";
import Heading from "../../../service/Form/Heading";

const Notes = () => {
  const { key } = useParams();
  const { roomAccessKey } = useAccessRoom();
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const [action, setAction] = useState(false);
  const [id, setID] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaulDes, setDefaultDes] = useState("");
  const email = user.email;
  const photoURL = user.photoURL;
  const name = user.displayName;
  const date = new Date().toString();

  useEffect(() => {
    fetch("https://family-server.malihatabassum.com/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const uid = key;

  const handleAddNote = () => {
    const newNote = { title, description, name, uid, email, photoURL, date };
    setNotes([newNote, ...notes]);
    setTitle("");
    setDescription("");
    fetch("https://family-server.malihatabassum.com/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully added the note.");
          window.location.reload();
        }
      });
  };

  const handleUpdate = (data) => {
    setDefaultTitle(data.title);
    setDefaultDes(data.description);
    setID(data._id);
    setAction(true);
  };

  const note_title = title ? title : defaultTitle;
  const note_des = description ? description : defaulDes;
  const handleUpdateNotes = () => {
    const update_note = {
      note_title,
      note_des,
    };
    const url = `https://family-server.malihatabassum.com/notes/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update_note),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Update Successful");
          window.location.reload();
          setAction(false);
        }
      });
  };

  // DELETE AN USER
  const handleDeleteNotes = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://family-server.malihatabassum.com/notes/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Deleted successfully");
            const remainingNotes = notes.filter((user) => user._id !== id);
            setNotes(remainingNotes);
          }
        });
    }
  };
  const found = notes?.some((data) => data.email === user.email);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-2 h-screen py-20">
        <Back />
        <Heading heading="Notes" className="text-gray-100" />

        <Toaster />

        <div className="flex flex-col items-center justify-center">
          <div className="lg:w-[500px] w-full">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="Title"
              defaultValue={defaultTitle}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 mt-2">
              <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea
                  id="notes"
                  type="text"
                  defaultValue={defaulDes}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Take A note..."
                  required
                ></textarea>
              </div>
              <div class="flex items-center justify-between px-3 py-2 border-t border-gray-200 dark:border-gray-600">
                {action ? (
                  <button
                    type="submit"
                    onClick={() => handleUpdateNotes()}
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:bg-cyan-800"
                  >
                    Update Note
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleAddNote}
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:bg-cyan-800"
                  >
                    Add Note
                  </button>
                )}

                <div class="flex pl-0 space-x-1 sm:pl-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-center items-center">
          {!found && (
            <div className="text-center text-3xl py-20">
              You Have no notes, please Take a note.
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes
            ?.filter((data) => data.uid === key)
            .map((data, index) => (
              <div className="rounded" key={index}>
                <div className="w-full h-fit flex flex-col justify-between items-start bg-cyan-300 rounded-lg border border-cyan-300 mb-6 py-5 px-4">
                  <div>
                    <h4 className="text-gray-800 font-bold mb-3">
                      {data.title}
                    </h4>
                    <p className="text-gray-800 text-sm">{data.description}</p>
                  </div>
                  <div className="w-full flex flex-col items-start mt-2">
                    <div className="flex items-center justify-between text-gray-800 w-full">
                      <div className="flex items-center justify-center">
                        <div>
                          <img
                            src={data.photoURL}
                            alt={data.photoURL}
                            className="h-9 w-9 rounded-full border border-gray-500"
                          />
                        </div>
                        <div>
                          <p className="ml-2 test-sm font-semibold">
                            {data.name}
                          </p>
                          <p className="ml-2 text-sm ">
                            {data?.date?.slice(0, 15)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer"
                          onClick={() => handleDeleteNotes(data._id)}
                        >
                          <AiFillDelete />
                        </div>

                        <div onClick={() => window.scrollTo(0, 0)}>
                          <div
                            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer"
                            onClick={() => handleUpdate(data)}
                          >
                            <AiFillEdit />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
