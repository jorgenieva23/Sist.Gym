import React from "react";
import { Footer, Navbar, Sidebar } from "../../components";

export const Income: React.FC = ():JSX.Element => {
    return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-grow">
            <Sidebar />
            <div className="max-w-md mx-auto flex-grow">
              <p className="text-center text-3xl font-bold">Hola soy Income</p>
            </div>
          </div>
          <Footer />
        </div>
      );
}