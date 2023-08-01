import React from "react";
import logoGym from "../../assets/logo.png";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 border-gray-700 border-t w-full py-1 px-5">
      <div className="flex items-center">
        <img src={logoGym} alt="Logo" className="w-10 h-10" />
        <p className="ml-3 text-white font-bold">hola</p>
      </div>
      <p className="px-2 py-1 text-xs font-bold bg-green-700 text-white rounded-md">
        Service Active
      </p>
    </nav>
  );
};

{
  /* <div className="flex bg-gray-500 border-t border-gray-400 ">
<div className="bg-red-200">
  <div >hola</div>
</div>
<div className="py-3 bg-black-200">
  <div className="text-lime-400 font-bold px-4">activo</div>
</div>
</div> */
}

export default Navbar;
