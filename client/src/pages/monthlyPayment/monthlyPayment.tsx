import React from "react";
import { EnConstruccion } from "../../components/EnConstruccion/EnConstruccion";
import { Footer, Navbar, Sidebar } from "../../components";

export const MonthlyPayment: React.FC = (): JSX.Element => {
  return (
    <header className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="max-w-md mx-auto flex-grow">
          <EnConstruccion showVolver={true} />
        </div>
      </div>
      <Footer />
    </header>
  );
};
