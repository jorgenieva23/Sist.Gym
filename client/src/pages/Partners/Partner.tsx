import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { PartnerTable } from "../../components/Tables/PartnerTable/PartnerTable";
import { Footer, Navbar, Sidebar } from "../../components";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";
import FormPartners from "../../components/Forms/Partners/FormPartners";

export const Partner: React.FC = (): JSX.Element => {
  const partners = useAppSelector((state) => state.partner.partners);
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Socios</div>
            <div className="py-2 my-2 mr-5">
              <ButtonRegister
                FormComponent={FormPartners}
                buttonText="Registrar"
                disabled={
                  !userRole || !userRole.permissions.includes("crearSocio")
                }
              />
            </div>
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
