import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./Pages/login.js";
import Home from "./Pages/homepage.js";
import Register from "./Pages/register.js";
import Header from "./Components/Header.js";
import AddBlog from "./Pages/AddBlog.js";
import AddCat from "./Pages/AddCat.js";
import SingBlog from "./Pages/SingBlog.js";
import PrivateRoute from "./Services/ProtectedRoutes.js";

const App = () => {
  return <>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* ProtectedRoutes */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/add-category" element={<AddCat />} />
        <Route path="/blog/:id" element={<SingBlog />} />
      </Route>


    </Routes>
  </>
};

export default App;