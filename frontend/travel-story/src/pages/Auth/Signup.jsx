// import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit");

    if (!username || !password || !confirmPassword || !fullName) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("please provide same password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., saving token, navigating to dashboard)
        console.log("Signup successful:", data);

        // Example: Save token to localStorage
        localStorage.setItem("token", data.token);

        // Redirect to home or any other page
        navigate("/");
      }
    } catch (error) {
      toast.success("error", {
        position: "bottom-left",
        autoClose: 1000,
      });
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="h-screen bg-[#ffffff] 
bg-gradient-to-r 
from-[#fff] 
to-[#50f4c0] 
via-transparent 
bg-[length:100%_200%] 
bg-[20%_20%] overflow-hidden
flex justify-center items-center "
    >
      <div className="w-[1000px] h-[580px] bg-emerald-600  rounded-3xl flex shadow-lg shadow-black ">
        <div className="w-[450px] h-[580px]  ">
          <form className="my-20" onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center text-white">TRAVEL DAIRIES</h2>

            <div className="px-20">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-8 p-2 bg-transparent text-white border-b border-white  placeholder-gray-400 text-xl focus:outline-none "
                placeholder="Username"
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-8 p-2 bg-transparent text-white border-b border-white  placeholder-gray-400 text-xl focus:outline-none "
                placeholder="Fullname"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-8 m p-2 bg-transparent text-white border-b border-white  placeholder-gray-400 text-xl focus:outline-none  "
                placeholder="password"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-8 m p-2 bg-transparent text-white border-b border-white  placeholder-gray-400 text-xl focus:outline-none  "
                placeholder=" confirm password"
              />
              <p className="text-red-500 text-sm">{error}</p>
              <button className="w-full mt-12 m py-2 bg-white text-blue rounded-xl hover:bg-slate-500">
                Signup
              </button>
              <p className="mt-2 text-white text-md">
                Already have account?{" "}
                <Link className="text-slate-400 hover:underline" to="/login">
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="w-[550px] h-[580px] relative  ">
          <img
            src="https://images.unsplash.com/photo-1653454322275-d8150441f416?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHRyYXZlbGluZyUyMHBvdHJhaXR8ZW58MHx8MHx8fDA%3D"
            className="w-[600px] h-[580px] rounded-3xl"
            alt=""
          />
          <div className=" text-white text-center mx-24 absolute bottom-96  ">
            <h1 className="font-bold text-4xl ">Experience the travel</h1>
            <p className="text-xl">
              Travel is the only thing you buy that can make you rich{" "}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
