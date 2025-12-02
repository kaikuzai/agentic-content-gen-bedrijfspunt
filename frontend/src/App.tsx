import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import IdeaBreakdownPage from "./pages/IdeaBreadownPage/IdeaBreakdownPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route key={"Home"} path="/" element={React.createElement(HomePage)} />
        <Route
          key={"Idea Breakdown"}
          path="/idea-breakdown"
          element={React.createElement(IdeaBreakdownPage)}
        />
        <Route
          key={"Product"}
          path="/product"
          element={React.createElement(ProductPage)}
        />
      </Routes>
    </>
  );
}

export default App;
