import { Quote } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="text-white mt-10 py-5" id="about">
      <p className="text-center text-[#] text-sm py-1 mb-12 px-4 rounded-md gradient-blue">
        ✦ &nbsp; Who Are We &nbsp; ✦
      </p>
      <div className="bg-[#1c1d22] w-full p-6 rounded-lg text-center text-sm md:text-lg max-w-5xl mx-auto mb-6 flex flex-col">
        <div className="flex justify-end items-center mb-4">
          <Quote className="mr-3" color="#cfcfcf" />
        </div>
        <p className="text-center text-[#cfcfcf] mb-6">
          Our mission is to empower students to make informed decisions about
          their education by providing personalized, AI-driven insights on
          professors and courses. We aim to enhance your academic journey by
          offering tailored recommendations, answering your specific questions,
          and delivering comprehensive ratings and reviews. Our goal is to
          support your educational choices with cutting-edge technology and
          expert guidance.
        </p>
      </div>
    </div>
  );
};

export default About;
