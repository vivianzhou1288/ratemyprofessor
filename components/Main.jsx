"use client";
import Image from "next/image";
import UserImg from "@/public/pfpsample.jpeg";
import critiqueImg from "@/public/critiqueLogo.png";
import { Apple, BookOpen, Lightbulb, Send, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Main = ({ user }) => {
  const contentRef = useRef(null);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="text-black flex flex-col w-full h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-[50px] flex items-center justify-end p-2 z-10">
        <Image
          src={UserImg}
          alt="User"
          className="h-[35px] w-[35px] rounded-full"
        />
      </div>

      {/* Content Area */}
      <div
        ref={contentRef}
        className="flex-1 w-full max-w-[1000px] m-auto mt-[50px] mb-[60px] flex flex-col overflow-auto scrollbar-hidden"
      >
        <div className="flex-1 p-4 pb-10 text-white">
          {intro ? (
            <div className="mt-[120px]">
              <h1 className="dark-gradient-blue text-5xl sm:text-6xl">
                Welcome, {user?.fullName || "Name"}
              </h1>
              <p className="text-3xl sm:text-4xl text-[#818183] mt-1">
                How can we help you today?
              </p>
              <div className="flex gap-3 justify-center flex-wrap mt-20">
                <div className="row gap-3">
                  <div className="card">
                    <Lightbulb color="#c2af35" />
                    <p className="mt-3">
                      Which teacher makes math concepts click easily?
                    </p>
                  </div>
                  <div className="card">
                    <BookOpen color="#3582c2" />
                    <p className="mt-3">
                      Which teacher has the best lecture notes or materials?
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:row gap-3">
                  <div className="card">
                    <Apple color="#db3c3c" />
                    <p className="mt-3">
                      Which teacher provides the most detailed feedback?
                    </p>
                  </div>
                  <div className="card">
                    <ThumbsUp color="#5bc235" />
                    <p className="mt-3">
                      Which teacher is the most lenient with deadlines?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="critiqueUser">
                <p className="critiqueUserChat"></p>
              </div>
              {}
              <div className="critiqueBot">
                <Image
                  className="rounded-md"
                  src={critiqueImg}
                  width={35}
                  alt=""
                />
                <p className="critiqueBotChat"></p>
              </div>
              {}
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="fixed bottom-0 left-0 right-0 pb-4 flex items-center justify-center">
        <div className="relative flex items-center w-full max-w-[1000px] px-4">
          <input
            type="text"
            placeholder="Write a prompt here..."
            className="bg-[#24252a] w-full text-sm p-4 pl-12 pr-16 text-white outline-none border border-[2px] border-[#1c1d22] rounded-full"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#0c6896] to-[#59a7ce] p-2 rounded-full cursor-pointer mr-3">
            <Send color="white" size={17} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
