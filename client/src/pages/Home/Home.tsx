import React from "react";
import { Footer, Navbar, Sidebar } from "../../components";
import { useAppSelector } from "../../redux/store";

export const Home: React.FC = (): JSX.Element => {
  const auth = useAppSelector((state) => state.user.users);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow bg-red-300">
          <div className="flex flex-wrap py-12 mt-6 justify-between gap-24 bg-blue-500">
            <div className="flex bg-indigo-600">
              <h1 className="text-3xl font-bold">
                cumpleassacumpleassasdoscumpleassasdossdos
              </h1>
            </div>
            <div className="bg-green-600 flex">
              <h1 className="text-3xl font-bold">
                indadasgindadasgredssoindadasoredsso
              </h1>
            </div>
          </div>
          <div className="bg-yellow-500 flex flex-wrap py-12 mt-6  gap-24">
            <div className="flex bg-indigo-600">
              <h1 className="text-3xl font-bold">cumpleassasdos</h1>
            </div>
            <div className="bg-green-600 flex">
              <h1 className="text-3xl font-bold">indadasgredsso</h1>
            </div>
          </div>
          <div className="bg-gray-500 flex flex-wrap py-12 mt-6  gap-24">
            <div className="flex bg-indigo-600">
              <h1 className="text-3xl font-bold">cumpleassasdos</h1>
            </div>
            <div className="bg-green-600 flex">
              <h1 className="text-3xl font-bold">indadasgredsso</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
