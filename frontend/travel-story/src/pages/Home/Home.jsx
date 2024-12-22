// import React from "react";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import TravelStoryCard from "./TravelStoryCard";
import { IoMdAdd } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [allStories, setAllStories] = useState({});
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // get stories
  const getStories = async () => {
    const response = await fetch(
      "http://localhost:5000/story/get-all-stories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    setAllStories(data);
  };
  // update isfav
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateFavourite = async (storydata) => {
    const response = await fetch(
      `http://localhost:5000/story/update-isfav/${storydata._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavourite: !storydata.isFavourite }),
        credentials: "include",
      }
    );
    if (response.ok) {
      toast.success(" updated successfully", {
        position: "bottom-left",
        autoClose: 1000,
      });
      setAllStories((prevStories) =>
        prevStories.map((item) =>
          item._id === storydata._id
            ? { ...item, isFavourite: !item.isFavourite }
            : item
        )
      );
    }
  };
  useEffect(() => {
    getStories();
  }, [allStories]);
  // console.log(allStories);

  return (
    <>
      <Nav />
      {/* {JSON.stringify(allStories)} */}
      <div className="container px-16 py-10">
        <div className="flex-1 ">
          {allStories.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 ">
              {allStories.map((item) => {
                return (
                  <TravelStoryCard
                    key={item._id}
                    title={item.title}
                    imgUrl={item.imageUrl}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onFavClick={() => updateFavourite(item)}
                  />
                );
              })}
            </div>
          ) : (
            <div className=" text-center">Loading.....</div>
          )}
        </div>
      </div>

      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-300 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <IoMdAdd className="text-[28px] text-white" />
      </button>
      <ToastContainer />
    </>
  );
};

export default Home;
