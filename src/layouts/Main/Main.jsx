import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = () => {
  return (
    <div className="flex text-start bg-white min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 pl-[326px] bg-[#F2F5F7]">
        <div className="sticky top-0 w-full p-[24px] z-10 ">
          <Header />
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
