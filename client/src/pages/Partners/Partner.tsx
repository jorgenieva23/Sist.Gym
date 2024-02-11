import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { PartnerTable } from "../../components/Tables/PartnerTable/PartnerTable";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import { Footer, Navbar, Sidebar } from "../../components";
import Modal from "../../components/Modal/Modal";
import ReactDOM from "react-dom";
import FormPartners from "../../components/Forms/Partners/FormPartners";

export const Partner: React.FC = (): JSX.Element => {
  const { getAllPartner } = usePartnerAction();
  const partners = useAppSelector((state) => state.partner.partners);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="mt-10 m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Partners</div>
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
                  <FormPartners />
                </div>
              </Modal>,
              document.body
            )}
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
