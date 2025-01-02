// import React from "react";
import { RxCross2 } from "react-icons/rx";
// import { MdDelete } from "react-icons/md";
import DateSelector from "./DateSelector";
import { useState } from "react";
import ImageSelector from "./ImageSelector";
import TagInput from "./TagInput";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddEditTravelStory = ({
  stroyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [error, setError] = useState("");
  const [visitedDate, setVisitedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [visitedLocation, setVisistedLocation] = useState([]);

  //Add Travel Stroy
  const addTravelStory = async () => {};
  //Upadate travel story
  const updateTravelStory = async () => {};

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("please enter the title ");
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!story) {
      setError("please enter the story ");
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setError("");
    if (type === "edit") {
      updateTravelStory();
    } else {
      addTravelStory();
    }
  };
  const handleDeleteStoryImg = async () => {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update story"}
        </h5>
        <div>
          <div className="flex items-center gap-4  p-2 rounded-lg">
            {type === "add" ? (
              <button
                className=" bg-emerald-600 text-white font-bold py-
            2 px-4 rounded"
                onClick={handleAddOrUpdateClick}
              >
                Add Story
              </button>
            ) : (
              <>
                <button
                  className="bg-emerald-600 text-white font-bold py-
            2 px-4 rounded"
                  onClick={handleAddOrUpdateClick}
                >
                  Update Story
                </button>
                {/* <button className="bg-rose-50 text-red-400 hover:bg-rose-200 rounded py-1 px-4 flex items-center">
                  delete <MdDelete size={"24px"} />
                </button> */}
              </>
            )}
            <button
              className="bg-emerald-600 text-white font-bold py-
            2 px-2 rounded"
              onClick={onClose}
            >
              <RxCross2 size={"24px"} />
            </button>
          </div>
        </div>
      </div>
      {/* {error && <p className="text-sm text-rose-500">{error}</p>} */}

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none border-b-2 rounded px-2 border-emerald-300"
            placeholder="A day at great wall"
            name=""
            id=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>
          <ImageSelector
            image={image}
            setImage={setImage}
            handleDeleteImg={handleDeleteStoryImg}
          />

          <label className="input-label">Story</label>
          <textarea
            type="text"
            className="text-xl text-slate-950 bg-slate-100 border rounded px-2 border-slate-300 outline-none "
            placeholder="Your Story"
            rows={5}
            name=""
            id=""
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>
        <div className="pt-3">
          <label className="input-label">Visited Locations</label>
          <TagInput tags={visitedLocation} setTags={setVisistedLocation} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEditTravelStory;
