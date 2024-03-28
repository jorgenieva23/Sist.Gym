import React from "react";
import { Footer, Navbar, Sidebar } from "../../components";

export const MonthlyPayment: React.FC = (): JSX.Element => {
  return (
    <header className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="max-w-md mx-auto flex-grow">
          <p className="text-center text-3xl font-bold">Hola soy mensualidad</p>
        </div>
      </div>
      <Footer />
    </header>
  );
};
