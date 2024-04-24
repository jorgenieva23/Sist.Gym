import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "../../components";

export const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <h1 className="flex flex-col items-center justify-center h-ful text-3xl md:text-4xl">
            NO KIERA, VUELVA AL
            <Link
              to="/home"
              className="font-bold text-sky-500 hover:underline"
            >
              PANEL
            </Link>
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};
