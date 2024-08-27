"use client";
import { Github, GraduationCap, House, PanelRightOpen, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({user, setSelectedConversation}) => {
  const [sidebar, setSidebar] = useState(false);
  const [conversations, setConversations] = useState(null)

  const fetchConversations = async () => {
    try {
      const response = await fetch(`/api/conversations/fetch?userId=${user.uid}`);
      const result = await response.json();

      if (response.ok) {
        setConversations(result.conversations);
        console.log(result.conversations)
      } else {
        console.log(`Error: ${result.error}`)
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  };

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
    fetchConversations();
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

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
          <h1 className="mx-5 mt-4">✦ Bookmarks</h1>
          <div className="mx-3 my-2 flex-1 overflow-y-auto p-2 rounded-md">
            <ul className="flex flex-col gap-2">
              {conversations.map((convo, index) => (
                <div key = {index} onClick = {() => {setSelectedConversation(convo); setSidebar(false)}}>
                   <li key = {index} className="prevChats">{convo.name}</li>
               </div>
              ))}
              {/* <li className="prevChats">Top Professors for Calculus</li>
              <li className="prevChats">Best Lecture Notes for Biology</li>
              <li className="prevChats">
                Detailed Feedback from Chemistry Instructors
              </li>
              <li className="prevChats">
                Lenient Deadlines for English Courses
              </li>
              <li className="prevChats">
                Recommended Professors for Statistics
              </li>
              <li className="prevChats">Top Professors for Calculus</li>
              <li className="prevChats">Best Lecture Notes for Biology</li>
              <li className="prevChats">
                Detailed Feedback from Chemistry Instructors
              </li>
              <li className="prevChats">
                Lenient Deadlines for English Courses
              </li>
              <li className="prevChats">
                Recommended Professors for Statistics
              </li>
              <li className="prevChats">Top Professors for Calculus</li>
              <li className="prevChats">Best Lecture Notes for Biology</li>
              <li className="prevChats">
                Detailed Feedback from Chemistry Instructors
              </li>
              <li className="prevChats">
                Lenient Deadlines for English Courses
              </li>
              <li className="prevChats">
                Recommended Professors for Statistics
              </li>
              <li className="prevChats">Top Professors for Calculus</li>
              <li className="prevChats">Best Lecture Notes for Biology</li>
              <li className="prevChats">
                Detailed Feedback from Chemistry Instructors
              </li>
              <li className="prevChats">
                Lenient Deadlines for English Courses
              </li>
              <li className="prevChats">
                Recommended Professors for Statistics
              </li> */}
            </ul>
          </div>
        </div>
      ) : (
        <PanelRightOpen
          color="#818183"
          className="fixed cursor-pointer p-3 w-[50px] h-[50px] z-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
