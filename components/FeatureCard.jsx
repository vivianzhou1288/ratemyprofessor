import React from "react";
import Image from "next/image";
import placeholderDemo from "@/public/placeholder.jpg";

const FeatureCard = () => {
  return (
    <div className="border-solid border-[1px] border-white w-full text-center p-4 rounded-md">
      <h1 className="text-xl text-white dark-gradient-blue">Feature Name</h1>
      <p className="text-white text-left text-sm mt-5 mb-2">
        Lorem ipsum dolor sit amet consec adipisicing elit. Dolorum, aut. Lorem
        ipsum dolor sit amet.
      </p>
    </div>
  );
};

export default FeatureCard;
