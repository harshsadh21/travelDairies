// // import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import loginImage from "../logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., saving token, navigating to dashboard)
        console.log("Login successful:", data);

        // Example: Save token to localStorage
        localStorage.setItem("token", data.token);

        // Redirect to dashboard or any other page
        navigate("/dashBoard");
      }
      if (!response.ok) {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="h-screen bg-[#ffffff] 
bg-gradient-to-r 
from-[#50f4c0] 
to-[#fff] 
via-transparent 
bg-[length:100%_200%] 
bg-[20%_20%] overflow-hidden
flex justify-center items-center "
    >
      <div className="w-[1000px] h-[580px] bg-emerald-600  rounded-3xl flex shadow-lg shadow-black ">
        <div className="w-[550px] h-[580px] relative  ">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
            className="w-[600px] h-[580px] rounded-3xl"
            alt=""
          />
          <div className=" text-white  text-center mx-24 absolute bottom-96 ">
            <h1 className="font-bold text-4xl ">Capture Your Journeys</h1>
            <p className="text-xl font-semibold">
              Record your travel experiences and memories in your personal
              ttravel journal
            </p>
          </div>
        </div>
        <div className="w-[450px] h-[580px]  ">
          <form className="my-28" onSubmit={OnSubmitHandler}>
            <h2 className="text-3xl text-center text-white">TRAVEL DAIRIES</h2>

            <div className="px-20">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-12 p-2 bg-transparent text-white border-b border-white  placeholder-gray-400 text-xl focus:outline-none "
                placeholder="Username"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-12 m p-2 bg-transparent text-white border-b border-white  placeholder-gray-400 text-xl focus:outline-none  "
                placeholder="password"
              />

              {error && <p className="text-red-700 mt-2 text-sm">{error}</p>}

              <button className="w-full mt-12 m py-2 bg-white text-blue rounded-xl hover:bg-slate-500">
                Login
              </button>
              <p className="mt-2 text-white text-md">
                Dont Have account?{" "}
                <Link className="text-slate-400 hover:underline" to="/signup">
                  Signup Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
