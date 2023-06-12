import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/dashboard/datalist",
      name: "Data List",
    },
  ];
  return (
    // <div className="container">
    //   <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
    //     <div className="top_section">
    //       <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
    //         Logo
    //       </h1>
    //       <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
    //         <span
    //           className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
    //           onClick={toggle}
    //         >
    //           <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
    //         </span>
    //       </div>
    //     </div>
    //     {menuItem.map((item, index) => (
    //       <Link href={item.path} key={index} className="link">
    //         <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
    //           {item.name}
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    //   <main>{children}</main>
    // </div>
    <>
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-1/4 overflow-y-auto text-center bg-gray-900 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">Ticket System</h1>
            <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={toggle}></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        {menuItem.map((item, index) => (
          <Link href={item.path} key={index} className="link">
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <i className="bi bi-house-door-fill"></i>
              <span className="text-[15px] ml-4 text-gray-200 font-bold">{item.name}</span>
            </div>
          </Link>
        ))}
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggle}
        >
          <i className="bi bi-chat-left-text-fill"></i>
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
            <span className="text-sm rotate-180" id="arrow">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>

        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <Link href={"/login"}>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
          </Link>
        </div>
      </div>
      <main></main>
    </>
  );
};

export default Sidebar;
