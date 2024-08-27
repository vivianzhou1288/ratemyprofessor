"use client"
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
import {auth, signOut} from "../firebase.js"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Main = ({ user, selectedConversation }) => {
  const contentRef = useRef(null);
  const [intro, setIntro] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const router = useRouter();
  const [conversationId, setConversationId] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleImageClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.conversation);  
      setConversationId(selectedConversation.id)
      setIsBookmarked(true)
      console.log(selectedConversation)
    } else {
      setMessages([]);  
      setConversationId(null)
    }
  }, [selectedConversation]);

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

  const updateBookmarkedConversation = async (userMessage, botMessage) => {
    try {
      console.log(userMessage)
      const updatedConversation = [
        { role: "user", content: userMessage.content },
        { role: "bot", content: botMessage },
      ];
  
      const response = await fetch("/api/conversations/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          userId: user.uid,
          updatedConversation,
        }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        console.error(result.error);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error updating conversation:", error);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIntro(false);
    setLoading(true);

    const newMessage = { role: "user", content: input };
    console.log(newMessage)
    setMessages((prev) => [
      ...prev,
      newMessage,
      { role: "bot", content: "Loading..." },
    ]);
    setInput("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([newMessage]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error during fetch:", response.status, errorText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const cleanedResult = cleanText(data.result);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: cleanedResult },
      ]);

      if (isBookmarked && conversationId) {
        await updateBookmarkedConversation(newMessage, cleanedResult);
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: "Error: Something went wrong." },
      ]);
    } finally {
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

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/")
  }

  const handleBookmarkToggle = async () => {
    setIsBookmarked(!isBookmarked)
    if (!user) {
      console.log("User is not logged in");
      return;
    }

    if (isBookmarked) {
      try {
        const response = await fetch ("api/conversations/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            conversationId: conversationId, 
            userId: user.uid
          }),
        });
        
        const result = await response.json();
        if (response.ok) {
          setIsBookmarked(false);
          console.log(result.message);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error deleting conversation:", error);
      }
    } else {
      try {
        const response = await fetch("/api/conversations/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            conversation: messages, 
            userId: user.uid, 
            name: messages.length > 1 && messages[0].role === "user"
            ? messages[0].content
            : "New Conversation"
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setIsBookmarked(true);
          console.log(result.message);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error adding conversation:", error);
      }
    }
  }

  const handleNewChat = () => {
    setIsBookmarked(false);
    setMessages([]);
  }

  return (
    <div className="text-black flex flex-col w-full h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-[50px] flex items-center justify-end p-2 z-10 gap-3 cursor-pointer">
        <div onClick = {handleNewChat}>
          <FilePlus2 color="#818183" />
        </div>
        <div onClick = {handleBookmarkToggle}>
          <Bookmark color={isBookmarked ? "#FFAE42" : "#818183"} />
        </div>
        <div className="relative">
          <Image
            src={user?.photoURL ? user.photoURL : UserImg}
            alt="User"
            width={35}
            height={35}
            className="rounded-full"
            onClick={handleImageClick}
          />
          {isPopupVisible && (
            <div className="absolute top-[100%] right-0 mt-2 p-2 bg-white shadow-lg border rounded">
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Content Area */}
      <div
        ref={contentRef}
        className="flex-1 w-full max-w-[1000px] m-auto mt-[50px] mb-[60px] flex flex-col overflow-auto scrollbar-hidden"
      >
        {/* Intro Content */}
        {messages.length === 0 ? (
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
                        "Which professor makes math concepts click easily?"
                      )
                    }
                  >
                    <Lightbulb color="#c2af35" />
                    <p className="mt-3">
                      Which professor makes math concepts click easily?
                    </p>
                  </div>
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which professor has the best lecture notes or materials?"
                      )
                    }
                  >
                    <BookOpen color="#3582c2" />
                    <p className="mt-3">
                      Which professor has the best lecture notes or materials?
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:row gap-3">
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which professor provides the most detailed feedback?"
                      )
                    }
                  >
                    <Apple color="#db3c3c" />
                    <p className="mt-3">
                      Which professor provides the most detailed feedback?
                    </p>
                  </div>
                  <div
                    className="card"
                    onClick={() =>
                      handleCardClick(
                        "Which professor is the most lenient with deadlines?"
                      )
                    }
                  >
                    <ThumbsUp color="#5bc235" />
                    <p className="mt-3">
                      Which professor is the most lenient with deadlines?
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
                  {message.content === "Loading..." ? (
                    <p className="text-gray-400">{message.content}</p>
                  ) : (
                    formatText(message.content)
                  )}
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
