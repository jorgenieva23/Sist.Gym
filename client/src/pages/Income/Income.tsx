import React, { useEffect, useState } from "react";
// import { useAppSelector } from "../../redux/store";
// import { useIncomeAction } from "../../redux/Actions/incomeAction";
import { Footer, Navbar, Sidebar } from "../../components";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import Modal from "../../components/Modal/Modal";
import ReactDOM from "react-dom";
import FormIncome from "../../components/Forms/Income/FormIncome";

export const Income: React.FC = (): JSX.Element => {
  // const { getAllIncome } = useIncomeAction();
  // const partners = useAppSelector((state) => state.partner.partners);
  const { getAllPartner } = usePartnerAction();

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="mt-10 flex-grow">
          <div className="flex border-2 border-t-gray-900 justify-between">
            <div className="text-3xl mt-2 text-blue-600  ml-7">Ingresos</div>
            <button
              className="border border-neutral-300 rounded-lg py-2 px-5 my-2 mr-6 bg-green-500 hover:bg-green-700 text-white"
              onClick={() => setOpenModal(true)}
            >
              Registro
            </button>
          </div>
          {openModal &&
            ReactDOM.createPortal(
              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="flex flex-col gap-4">
                  <FormIncome />
                </div>
              </Modal>,
              document.body
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
