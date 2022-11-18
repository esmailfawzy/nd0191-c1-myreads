import "./App.css";
import React from "react";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;
