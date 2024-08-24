import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="mt-40">
      <p className="text-center text-[#] text-sm py-1 mb-12 px-4 rounded-md gradient-blue">
        ✦ &nbsp; Features &nbsp; ✦
      </p>
      <div className="flex mx-[50px] sm:mx-0 flex-col sm:flex-row gap-10 ">
        <FeatureCard
          name="Get tailored recommendations"
          desc="Personalized professor picks based on your needs."
        />
        <FeatureCard
          name="Get answers to your questions"
          desc="Instant answers about professors you’re curious about."
        />
        <FeatureCard
          name="See overall ratings"
          desc="Check overall ratings for any professor."
        />
      </div>
    </div>
  );
};

export default Features;
