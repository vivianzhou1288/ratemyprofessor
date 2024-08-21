"use client";
import { PanelRightOpen, X } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      {sidebar ? (
        <div className="fixed text-white bg-[#24252a] p-4 max-w-[270px] w-full h-full z-50">
          <div className="flex justify-between">
            <p>Critique</p>
            <X onClick={toggleSidebar} className="cursor-pointer" />
          </div>
        </div>
      ) : (
        <PanelRightOpen
          className="fixed cursor-pointer p-3 w-[50px] h-[50px] z-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
