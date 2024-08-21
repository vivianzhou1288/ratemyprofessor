"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      {sidebar ? (
        <div className="fixed text-black bg-[#fff5ff] p-4 max-w-[270px] w-full h-full">
          <div className="flex justify-between">
            <p>SuperNova</p>
            <p>
              <X />
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
