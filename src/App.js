import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user/:userId" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
