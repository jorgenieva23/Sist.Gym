import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import Modal from "../../components/Modal/Modal";
import ReactDOM from "react-dom";
import { PaymentTable } from "../../components/Tables/PyamentTable/PaymentTable";
import { usePaymentAction } from "../../redux/Actions/paymentActions";
import { usePromotionAction } from "../../redux/Actions/promotionAction";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import FormPayment from "../../components/Forms/Payment/FormPayment";

export const Payment: React.FC = (): JSX.Element => {
  const { getAllPayment } = usePaymentAction();
  const { getAllPromotion } = usePromotionAction();
  const { getAllPartner } = usePartnerAction();

  const payment = useAppSelector((state) => state.payment.payments);

  const [openModal, setOpenModal] = useState<boolean>(false);

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
            <button
              className="border border-neutral-300 rounded-lg py-2 px-5 my-2 mr-6 bg-green-500 hover:bg-green-700 text-white"
              onClick={() => setOpenModal(true)}
            >
              Registers
            </button>
          </div>
          {openModal &&
            ReactDOM.createPortal(
              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="flex flex-col gap-4">
                  <FormPayment />
                </div>
              </Modal>,
              document.body
            )}
          <div className="m-5">
            <PaymentTable currentPayments={payment} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
