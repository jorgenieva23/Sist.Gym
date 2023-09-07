import React from "react";
import { Footer, Navbar, Sidebar } from "../../components";

export const Balance: React.FC = (): JSX.Element => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="max-w-md mx-auto flex-grow">
          <p className="text-center text-3xl font-bold">Hola soy Balance</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
