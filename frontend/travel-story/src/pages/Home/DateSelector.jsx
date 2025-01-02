// import React from 'react'

import { MdClose, MdOutlineDateRange } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import { useState } from "react";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] text-emerald-400 bg-emerald-200/4 rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange />
        {date
          ? moment(date).format("Do MM YYYY")
          : moment().format("DD MM YYYY")}
      </button>
      {openDatePicker && (
        <div className=" overflow-y-scroll p-5 bg-emerald-100/50 rounded-lg relative pt-8">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-100/4 hover:bg-emerald-100 absolute top-2 right-2"
            onClick={() => {
              setOpenDatePicker(false);
            }}
          >
            <MdClose className="text-xl text-emerald-400" />
          </button>
          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagedNavigation
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
