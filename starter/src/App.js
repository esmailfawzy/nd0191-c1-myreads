import "./App.css";
import React from "react";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default App;
