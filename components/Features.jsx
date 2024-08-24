import React from "react";
import FeatureCard from "./FeatureCard";
import { MessagesSquare, ScanSearch, Star } from "lucide-react";

const Features = () => {
  return (
    <div className="mt-40 py-5" id="features">
      <p className="text-center text-[#] text-sm py-1 mb-12 px-4 rounded-md gradient-blue ">
        ✦ &nbsp; Explore Our Key Features &nbsp; ✦
      </p>
      {/* <p className="text-center text-white text-lg font-semibold mb-6">
        Explore Our Key Features
      </p> */}

      <div className="flex mx-[50px] sm:mx-0 flex-col sm:flex-row gap-10 justify-center ">
        <FeatureCard
          icon={
            <ScanSearch size={100} className="m-auto my-10" color="#59a7ce" />
          }
          name="Get tailored recommendations"
          desc="Personalized professor picks based on your needs and preferences."
        />
        <FeatureCard
          icon={
            <MessagesSquare
              size={100}
              className="m-auto my-10"
              color="#59a7ce"
            />
          }
          name="Get answers to your questions"
          desc="Instant answers about professors you’re curious about and more."
        />
        <FeatureCard
          icon={<Star size={100} className="m-auto my-10" color="#59a7ce" />}
          name="See overall ratings"
          desc="View comprehensive ratings and detailed feedback for professors."
        />
      </div>
    </div>
  );
};

export default Features;
