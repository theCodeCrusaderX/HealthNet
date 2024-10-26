import React from "react";
import { Outlet } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Home />
      <Outlet />
    </>
  );
}

export default App;
