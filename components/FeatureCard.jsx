import React from "react";
import Image from "next/image";
import placeholderDemo from "@/public/placeholder.jpg";
import { Bot } from "lucide-react";

const FeatureCard = (props) => {
  return (
    <div className="bg-[#1c1d22] w-full p-4 rounded-lg">
      <Bot size={100} className="m-auto" color="#59a7ce" />
      <h1 className="my-2 text-md text-[#cfcfcf]">{props.name}</h1>
      <p className="text-[#818183] text-left text-sm mt-1 mb-2">{props.desc}</p>
    </div>
  );
};

export default FeatureCard;
