"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState();
  const [activeTab, setActiveTab] = useState("User");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleUserData = async () => {

  }
  return (
    <div className="w-2/3">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap p-1 list-none rounded-xl bg-blue-gray-50/60"
          data-tabs="tabs"
          role="list"
        >
          <li className="z-30 flex-auto text-center">
            <a
              className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
              data-tab-target="app"
              onClick={() => handleTabClick("User")}
              active=""
              role="tab"
              aria-selected="true"
              aria-controls="app"
            >
              <span className="ml-1">User</span>
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a
              className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
              data-tab-target="message"
              onClick={() => handleTabClick("Order in process")}
              role="tab"
              aria-selected="false"
              aria-controls="message"
            >
              <span className="ml-1">Order in process</span>
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a
              className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
              data-tab-target="settings"
              onClick={() => handleTabClick("Order confirmed")}
              role="tab"
              aria-selected="false"
              aria-controls="settings"
            >
              <span className="ml-1">Order confirmed</span>
            </a>
          </li>
        </ul>
        <div className="flex">
          <div
            className={`w-full p-5 ${
              activeTab === "User" ? "block" : "hidden"
            }`}
            id="User"
            role="tabpanel"
          ></div>
          <div
            className={`w-full p-5 ${
              activeTab === "Order in process" ? "block" : "hidden"
            }`}
            id="Order in process"
            role="tabpanel"
          ></div>
          <div
            className={`w-full p-5 ${
              activeTab === "Order confirmed" ? "block" : "hidden"
            }`}
            id="Order confirmed"
            role="tabpanel"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default page;
