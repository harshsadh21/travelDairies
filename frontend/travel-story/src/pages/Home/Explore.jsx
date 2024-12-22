import { Link } from "react-router-dom";

// import main from "../Home/download.jpeg";
const Explore = () => {
  return (
    <div className="w-screen h-screen mt-2">
      <div className="w-full h-2/3 bg-[#F6F3F2] pt-24 px-36 flex gap-44 flex-wrap">
        <img
          className="h-[500px] w-96 rounded-xl"
          src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwcG90cmFpcnR8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
        <div>
          <p className="text-xl font-medium  text-gray-500 hover:text-gray-700">
            ABOUT US
          </p>
          <h2 className="text-5xl mt-4 ">
            Travel To Any Corner <br /> Of The World
          </h2>
          <p className="text-2xl font-medium mt-5 text-gray-700 ">
            Our Vision is to provide you a best stories of the destination.{" "}
          </p>
          <p className="text-2xl font-medium  text-gray-700 ">
            Record your travel experience and memories in your personal <br />{" "}
            travel journal.
          </p>
          <Link to="/about">
            <button className="mt-5 py-3 px-5 bg-emerald-500 text-white text-2xl border-none rounded-lg hover:bg-emerald-600">
              Back
            </button>
          </Link>

          <div className="mt-16 flex gap-24 pr-20">
            <div>
              <h2 className="text-2xl font-semibold">FACEBOOK</h2>
              <h1 className="text-3xl mt-2">12k</h1>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">INSTAGRAM</h2>
              <h1 className="text-3xl mt-2">24k</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
