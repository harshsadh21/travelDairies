// import React from 'react'

// import { useEffect } from "react";

import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/userContext";
import getInitials from "../../Helper";
// import {userContext} from "../../context/userContext";

const Nav = () => {
  const { user, setUser, getUser } = useContext(DataContext);
  // console.log(data);
  useEffect(() => {
    getUser();
  }, []);
  // console.log(user);

  const name = user?.user?.fullName || "guest";
  const nameShort = getInitials(name);

  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="flex text-2xl justify-between items-center  px-16 py-7   h-[50px]">
        <div className="font-semibold text-black">TravelDairies</div>
        <div className="flex gap-5 text-xl justify-center items-center ">
          {/* <Link to="/">Home</Link> */}
          <Link to="/dashBoard">Home</Link>
          <Link to="/about">About</Link>

          <button
            className="bg-red-500 px-4 py-1 rounded-xl text-white hover:bg-red-700"
            onClick={Logout}
          >
            logout
          </button>
          <div className="bg-emerald-300 text-white font-semibold px-3 py-1 rounded-full flex justify-center items-center">
            {nameShort}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Nav;
