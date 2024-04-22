import React, { useEffect } from "react";
import { Footer, Navbar, Sidebar } from "../../components";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import FormIncome from "../../components/Forms/Income/FormIncome";
import IncomeTable from "../../components/Tables/IncomeTable/IncomeTable";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";
import { useAppSelector } from "../../redux/hooks";

export const Income: React.FC = (): JSX.Element => {
  const { getAllPartner } = usePartnerAction();

  const incomes = useAppSelector((state) => state.income.income);
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Ingresos</div>
            <div className="py-2 my-2 mr-5">
              <ButtonRegister
                FormComponent={FormIncome}
                buttonText="Registrar"
                disabled={
                  !userRole || !userRole.permissions.includes("indexIngresos")
                }
              />
            </div>
          </div>

          <div className="m-5">
            <IncomeTable currentIncome={incomes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
