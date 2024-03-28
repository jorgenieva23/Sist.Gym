import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Footer, Navbar, Sidebar } from "../../components";
import { useAppSelector } from "../../redux/hooks";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import FormIncomePanel from "../../components/Forms/Income/FormIncomePanel";

export const Home: React.FC = (): JSX.Element => {
  const { getAllPartner } = usePartnerAction();

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow md:flex-col bg-white">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 py-2 m-4 bg-blue-500">
            <div className="mx-5 bg-indigo-900">
              <div className="mb-20 m-2">
                <h1 className="text-2xl font-bold text-white">Ingresos</h1>
                <FormIncomePanel />
              </div>
            </div>

            <div className="bg-green-600 mx-5">
              <h1 className="text-3xl font-bold">texto</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
