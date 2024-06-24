import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./RouteLayout.css";

const RouteLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="content-container">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RouteLayout;
