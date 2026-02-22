import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-200 ">
      <div className="container mx-auto p-4 flex justify-between">
        <p className="font-bold">Developed By Bilal</p>
        <Link to={"https://bilal-dev.vercel.app"}>
          <div className="flex gap-2 items-center text-red-600 cursor-pointer">
            <p>Visit portfolio</p>
            <FaArrowRight />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
