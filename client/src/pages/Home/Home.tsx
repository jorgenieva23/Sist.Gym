import React, { useEffect, useState } from "react";
import { Footer, Navbar, Sidebar } from "../../components";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import { useAppSelector } from "../../redux/hooks";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";
import FormPartners from "../../components/Forms/Partners/FormPartners";
import FormPayment from "../../components/Forms/Payment/FormPayment";
import FormIncomePanel from "../../components/Forms/Income/FormIncomePanel";
import CardPartner from "../../components/Card/Card";
import { ExpiredPayment } from "../../components/Tables/ExpiredTable/ExpiredTable";

export const Home: React.FC = (): JSX.Element => {
  const { getAllPartner } = usePartnerAction();
  const partners = useAppSelector((state) => state.partner.partners);

  const [selectedButton, setSelectedButton] = useState("usuarios");

  const Birthday = partners.filter((partner) => {
    const today = new Date();
    const dob = new Date(partner.date);
    return (
      dob.getUTCDate() === today.getUTCDate() &&
      dob.getUTCMonth() === today.getUTCMonth()
    );
  });

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow md:flex-col bg-zinc-200">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 m-4 gap-4">
            <div className="bg-white shadow rounded-lg">
              <div className="text-xl rounded-t-lg bg-zinc-900 font-semibold py-1 text-white">
                <h1 className="mx-3 ">Ingresos</h1>
              </div>
              <div className="mb-4 ">
                <FormIncomePanel />
              </div>
            </div>

            <div className="bg-white mb-12 shadow rounded-lg">
              <div className="text-xl text-white shadow rounded-t-lg bg-zinc-900 font-semibold py-1">
                <h1 className="mx-2 ">Acciones rapidas</h1>
              </div>
              <div className="flex flex-grow mt-6 mx-2">
                <ButtonRegister
                  FormComponent={FormPartners}
                  buttonText="Registrar socio"
                />
                <ButtonRegister
                  FormComponent={FormPayment}
                  buttonText="Registrar socio"
                />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="text-xl text-white bg-zinc-900 font-semibold rounded-t-lg py-1">
                {Birthday.length > 0 ? (
                  <h1 className="mx-2">Socios que cumplen años hoy</h1>
                ) : (
                  <h1 className="mx-2">No hay socios que cumplan años hoy</h1>
                )}
              </div>
              <div className="grid m-6 mx-2">
                <CardPartner partner={Birthday} />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mx-4">
            <div className="text-xl rounded-t-lg bg-zinc-900 font-semibold py-1 text-white">
              <h1 className="mx-3">Cuotas</h1>
            </div>
            <div className="m-4 gap-4">
              <button
                onClick={() => setSelectedButton("vencen hoy")}
                className="border border-neutral-300 rounded-lg py-2 mr-6 w-32 bg-green-500  text-white items-center"
              >
                Vencen Hoy
              </button>
              <button
                onClick={() => setSelectedButton("a vencer mañana")}
                className="border border-neutral-300 rounded-lg py-2 mr-6 w-32 bg-green-500   text-white items-center"
              >
                Vencen mañana
              </button>
            </div>
            <div>
              <ExpiredPayment selectedButton={selectedButton} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
