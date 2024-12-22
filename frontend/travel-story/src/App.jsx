// import React from "react";

import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Explore from "./pages/Home/Explore";
import About from "./pages/Home/About";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dashBoard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/expolre" exact element={<Explore />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
