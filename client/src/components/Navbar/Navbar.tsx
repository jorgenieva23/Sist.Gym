import React from "react";
import logoGym from "../../assets/JNG.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between border-b-2 border-gray-600 items-center bg-gray-800 w-full py-2 px-5">
      <div className="flex items-center">
        <img src={logoGym} alt="Logo" className="w-10 h-10 rounded-md" />
        <p className="ml-3 text-white font-bold px-2">JerjesGym</p>
      </div>
      <p className="px-2 py-1 font-bold bg-green-700 text-white rounded-md">
        Service Active
      </p>
    </nav>
  );
};
export default Navbar;
