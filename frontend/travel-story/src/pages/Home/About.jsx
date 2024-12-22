import main from "../Home/download.jpeg";
import Nav from "./Nav";
import Card from "./Card";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");

    // If token doesn't exist, redirect to login page
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="overflow-x-hidden">
      <Nav />
      <div className="w-screen px-16   flex ">
        <div className="w-1/2  mt-20">
          <h1 className="text-5xl  ">
            We are the <span className="text-emerald-400">coolest</span> Travel
            Stories provider in India.
          </h1>
          <p className="text-xl mt-12">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
            possimus quis natus, cumque nemo aut harum exercitationem officia
            nihil corporis quibusdam rem recusandae?
          </p>
          <Link to="/expolre">
            <button className=" mt-12 py-3 px-7 bg-emerald-500 text-white text-2xl border-none rounded-lg hover:bg-emerald-600">
              Explore
            </button>
          </Link>
        </div>
        <div className="w-1/2  flex justify-center  ">
          <img src={main} className="w-96 h-[450px]" alt="" />
        </div>
      </div>

      <div className=" px-16">
        <p className="text-sm font-medium pt-3 text-gray-500 hover:text-gray-700 ">
          WHERE TO GO
        </p>
        <h1 className="text-4xl font-semibold mt-1">
          Popular{" "}
          <span className="text-emerald-400 underline underline-offset-8">
            Destinations
          </span>
        </h1>
        <div className="px-10 mt-5 flex gap-16 flex-wrap ">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default About;
