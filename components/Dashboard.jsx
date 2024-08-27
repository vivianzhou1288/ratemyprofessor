"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem("user");

      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        console.error("No user data found in local storage.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-white flex flex-row">
      <Sidebar user={user} setSelectedConversation={setSelectedConversation} />
      <Main user={user} selectedConversation={selectedConversation} />
    </div>
  );
};

export default Dashboard;
