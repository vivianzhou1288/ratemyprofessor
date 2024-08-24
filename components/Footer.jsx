import React from "react";

const Footer = () => {
  return (
    <div className="text-white mt-20 ">
      <hr />
      <div className="py-10 flex items-center justify-between text-sm">
        <p>© 2024 Critique</p>
        <p className="hover:text-[#59a7ce] text-sm">
          <a
            href="https://github.com/vivianzhou1288/ratemyprofessor"
            target="_blank"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
