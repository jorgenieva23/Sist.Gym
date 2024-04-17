import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { PartnerTable } from "../../components/Tables/PartnerTable/PartnerTable";
import { Footer, Navbar, Sidebar } from "../../components";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";
import FormPartners from "../../components/Forms/Partners/FormPartners";

export const Partner: React.FC = (): JSX.Element => {
  const partners = useAppSelector((state) => state.partner.partners);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="mt-8 m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex mt-2 justify-between">
            <div className="text-3xl text-blue-700 ml-7">Partners</div>
            <ButtonRegister
              FormComponent={FormPartners}
              buttonText="Registrar"
            />
          </div>
          <div className="m-5">
            <PartnerTable currentPartner={partners} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partner;
