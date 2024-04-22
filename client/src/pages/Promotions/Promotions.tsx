import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";
import { usePromotionAction } from "../../redux/Actions/promotionAction";
import FormPromotion from "../../components/Forms/Promotion/PromotionForm";
import { PromotionTable } from "../../components/Tables/PromotionTable/PromotionTable";

export const Promotion: React.FC = (): JSX.Element => {
  const { getAllPromotion } = usePromotionAction();

  const promotion = useAppSelector((state) => state.promotion.promotions);
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  useEffect(() => {
    getAllPromotion();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Promotions</div>
            <div className="py-2 my-2 mr-5">
              <ButtonRegister
                FormComponent={FormPromotion}
                buttonText="Registrar"
                disabled={
                  !userRole || !userRole.permissions.includes("crearSocio")
                }
              />
            </div>
          </div>

          <div className="m-5">
            <PromotionTable currentPromotions={promotion} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
