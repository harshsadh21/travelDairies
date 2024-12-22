/* eslint-disable react/prop-types */
// import React from "react";
import moment from "moment";
import { FiMap } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const TravelStoryCard = ({
  title,

  imgUrl,
  story,
  date,
  visitedLocation,
  isFavourite,
  onFavClick,
}) => {
  console.log(imgUrl);
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
      />
      <button
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/40 absolute top-4 right-4   "
        onClick={onFavClick}
      >
        <FaHeart
          className={`${
            isFavourite ? "text-red-500" : "text-white"
          } text-[22px]  cursor-pointer hover:text-red-500 `}
        />
      </button>
      <div className="p-4 ">
        <div className="flex items-center gap-6 ">
          <div className="flex-1">
            <h6 className="text-xl font-medium">{title}</h6>
            <span className="text-sm text-slate-500">
              {date ? moment(date).format("MMMM D, YYYY") : "-"}
            </span>
          </div>
        </div>
        <p className="text-lg text-slate-500">{story?.slice(0, 60)}</p>
        <div className="inline-flex gap-2 items-center text-[16px] text-emerald-600 bg-emerald-400/40 py-1 px-2 rounded mt-2">
          <FiMap className="" />
          <span className="">
            {/* {visitedLocation.map((item, index) => {
              visitedLocation.length === index + 1 ? `${item}` : `${item}`;
            })} */}
            {visitedLocation[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
