import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import { PaymentTable } from "../../components/Tables/PyamentTable/PaymentTable";
import { usePaymentAction } from "../../redux/Actions/paymentActions";
import { usePromotionAction } from "../../redux/Actions/promotionAction";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import FormPayment from "../../components/Forms/Payment/FormPayment";
import ButtonRegister from "../../components/Buttons/ButtonRegisterP";

export const Payment: React.FC = (): JSX.Element => {
  const { getAllPayment } = usePaymentAction();
  const { getAllPromotion } = usePromotionAction();
  const { getAllPartner } = usePartnerAction();

  const payment = useAppSelector((state) => state.payment.payments);
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  useEffect(() => {
    getAllPayment();
    getAllPromotion();
    getAllPartner();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Pagos</div>
            <div className="py-2 my-2 mr-5">
              <ButtonRegister
                FormComponent={FormPayment}
                buttonText="Registrar"
                disabled={
                  !userRole || !userRole.permissions.includes("crearCuota")
                }
              />
            </div>
          </div>

          <div className="m-5">
            <PaymentTable currentPayments={payment} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
