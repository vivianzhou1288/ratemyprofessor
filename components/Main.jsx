"use client";
import Image from "next/image";
import UserImg from "@/public/pfpsample.jpeg";
import critiqueImg from "@/public/critiqueLogo.png";
import {
  Apple,
  Bookmark,
  BookOpen,
  FilePlus2,
  Lightbulb,
  Send,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Main = ({ user }) => {
  const contentRef = useRef(null);
  const [intro, setIntro] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  const cleanText = (text) => {
    return text
      .replace(/^\*\s*/gm, "")
      .replace(/\*\*/g, "")
      .trim();
  };

  const formatText = (text) => {
    const paragraphs = text
      .split("\n\n")
      .filter((paragraph) => paragraph.trim() !== "");

    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph.split("\n").map((line, lineIndex) => (
          <span key={lineIndex}>
            {line}
            <br />
          </span>
        ))}
      </p>
    ));
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIntro(false);
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ role: "user", content: input }]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error during fetch:", response.status, errorText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const cleanedResult = cleanText(data.result);
      setMessages((prev) => [...prev, { role: "bot", content: cleanedResult }]);
    } catch (error) {
      console.error("Error during fetch:", error.message);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error: Something went wrong." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleCardClick = (prompt) => {
    setInput(prompt);
    handleSubmit();
  };

  return (
    <div className="text-black flex flex-col w-full h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-[50px] flex items-center justify-end p-2 z-10 gap-3 cursor-pointer">
        <FilePlus2 color="#818183" />
        <Bookmark color="#818183" />
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
        {/* Intro Content */}
        {intro ? (
          <div className="flex-1 flex flex-col justify-center items-center p-4 text-white">
            <div className="">
              <h1 className="dark-gradient-blue text-5xl sm:text-6xl">
                Welcome, {user?.fullName || ""}
              </h1>
              <p className="text-3xl sm:text-4xl text-[#818183] mt-1">
                How can we help you today?
              </p>
              <div className="flex gap-3 justify-center flex-wrap mt-20">
                <div className="row gap-3">
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which teacher makes math concepts click easily?"
                      )
                    }
                  >
                    <Lightbulb color="#c2af35" />
                    <p className="mt-3">
                      Which teacher makes math concepts click easily?
                    </p>
                  </div>
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which teacher has the best lecture notes or materials?"
                      )
                    }
                  >
                    <BookOpen color="#3582c2" />
                    <p className="mt-3">
                      Which teacher has the best lecture notes or materials?
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:row gap-3">
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which teacher provides the most detailed feedback?"
                      )
                    }
                  >
                    <Apple color="#db3c3c" />
                    <p className="mt-3">
                      Which teacher provides the most detailed feedback?
                    </p>
                  </div>
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which teacher is the most lenient with deadlines?"
                      )
                    }
                  >
                    <ThumbsUp color="#5bc235" />
                    <p className="mt-3">
                      Which teacher is the most lenient with deadlines?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Messages Container
          <div className="flex-1 p-4 pb-10 text-white flex flex-col">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user" ? "critiqueUser" : "critiqueBot"
                }
              >
                {message.role === "bot" && (
                  <Image
                    className="rounded-md"
                    src={critiqueImg}
                    width={35}
                    height={35}
                    alt="Bot Icon"
                  />
                )}
                <div
                  className={
                    message.role === "user"
                      ? "critiqueUserChat"
                      : "critiqueBotChat"
                  }
                >
                  {formatText(message.content)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="fixed bottom-0 left-0 right-0 pb-1 flex items-center justify-center">
        <div className="relative items-center w-full max-w-[1000px] px-4">
          <div className="relative flex items-center w-full max-w-[1000px] px-4">
            <input
              type="text"
              placeholder="Write a prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-[#24252a] w-full text-sm p-4 pl-12 pr-16 text-white outline-none border border-[2px] border-[#1c1d22] rounded-full"
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#0c6896] to-[#59a7ce] p-2 rounded-full cursor-pointer mr-3"
              onClick={handleSubmit}
            >
              <Send color="white" size={17} />
            </div>
          </div>
          <p className="text-white text-[12px] text-center p-1 text-[#59595c]">
            Critique can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
