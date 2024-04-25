import React from "react";
import { EnConstruccion } from "../../components/EnConstruccion/EnConstruccion";
import { Footer, Navbar, Sidebar } from "../../components";

export const MonthlyPayment: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 overflow-auto rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <EnConstruccion showVolver={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
