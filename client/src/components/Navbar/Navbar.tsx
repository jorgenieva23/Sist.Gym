import React from "react";
import logoGym from "../../assets/logo.png";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 border-gray-700 border-t w-full py-1 px-5">
      <div className="flex items-center">
        <img src={logoGym} alt="Logo" className="w-10 h-10" />
        <p className="ml-3 text-white font-bold">"nombre del usuario"</p>
      </div>
      <p className="px-2 py-1 text-xs font-bold bg-green-700 text-white rounded-md">
        Service Active
      </p>
    </nav>
  );
};
export default Navbar;
