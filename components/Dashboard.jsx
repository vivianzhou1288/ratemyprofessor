import React from "react";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

const Dashboard = () => {
  return (
    <div className="text-white flex flex-row ">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;
