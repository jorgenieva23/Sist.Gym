import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { PartnerTable } from "../../components/PartnerTable/PartnerTable";
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
    console.log(getAllPartner(), "Hola");
  }, []);

  // useEffect(()=> {
  //   setCurrentPage(1)
  // }, [])

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow">
          <div className="flex justify-between">
            <div className="text-3xl text-blue-600 ml-7">Socios</div>
            <button
              className="border border-neutral-300 rounded-lg py-2 px-10 my-2 mr-6 bg-green-500 hover:bg-green-700 text-white"
              onClick={() => setOpenModal(true)}
            >
              registro
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
          <div className=" overflow-y-auto ml-2">
            <PartnerTable currentPartner={partners} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partner;
