"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

const Dashboard = () => {
  const [user, setUser] = useState(null);

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
      <Sidebar />
      <Main user={user} />
    </div>
  );
};

export default Dashboard;
