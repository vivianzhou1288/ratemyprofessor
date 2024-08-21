import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="mt-20">
      <p className="text-center text-[#] text-sm py-1 mb-7 px-4 rounded-md gradient-blue">
        ✦ Features
      </p>
      <div className="flex mx-[50px] sm:mx-0 flex-col sm:flex-row gap-10">
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
    </div>
  );
};

export default Features;
