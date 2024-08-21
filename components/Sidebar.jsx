"use client";
import { Github, GraduationCap, House, PanelRightOpen, X } from "lucide-react";
import React, { useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      {sidebar ? (
        <div className="fixed text-white bg-[#24252a] max-w-[270px] w-full h-full z-50 flex flex-col">
          <div>
            <PanelRightOpen
              onClick={toggleSidebar}
              className="cursor-pointer p-3 w-[50px] h-[50px]"
            />
          </div>
          <div className="p-3 flex gap-2 items-center">
            <Image
              src={Logo}
              alt=""
              width={30}
              className="bg-[#90C5DF] rounded-md"
            />
            <h1 className="text-lg font-medium">Critique</h1>
          </div>
          <Link href="/">
            <div className="mt-2 mx-3 my-2 p-2 rounded-md flex gap-3 cursor-pointer hover:bg-[#3a3c41] hover:text-[#90c5df]">
              <House />
              <p>Home</p>
            </div>
          </Link>
          <a
            href="https://github.com/vivianzhou1288/ratemyprofessor"
            target="_blank"
          >
            <div className="mt-1 mx-3 my-2 p-2 rounded-md flex gap-3 cursor-pointer hover:bg-[#3a3c41] hover:text-[#90c5df]">
              <Github />
              <p>Repository</p>
            </div>
          </a>
          {/* Chats section */}
          <div className="mx-3 my-2 flex-1 overflow-y-auto p-2 rounded-md">
            <h1 className="mb-5">✦ Bookmarks</h1>
            <ul className="flex flex-col gap-2">
              <li className="prevChats">Project Deadline Discussion</li>
              <li className="prevChats">Weekend Plans</li>
              <li className="prevChats">Document Review</li>
              <li className="prevChats">Team Meeting Reminder</li>
              <li className="prevChats">Follow-Up on Files</li>
              <li className="prevChats">Project Deadline Discussion</li>
              <li className="prevChats">Weekend Plans</li>
              <li className="prevChats">Document Review</li>
              <li className="prevChats">Team Meeting Reminder</li>
              <li className="prevChats">Follow-Up on Files</li>
              <li className="prevChats">Project Deadline Discussion</li>
              <li className="prevChats">Weekend Plans</li>
              <li className="prevChats">Document Review</li>
              <li className="prevChats">Team Meeting Reminder</li>
              <li className="prevChats">Follow-Up on Files</li>
              <li className="prevChats">Project Deadline Discussion</li>
              <li className="prevChats">Weekend Plans</li>
              <li className="prevChats">Document Review</li>
              <li className="prevChats">Team Meeting Reminder</li>
              <li className="prevChats">Follow-Up on Files</li>
            </ul>
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
