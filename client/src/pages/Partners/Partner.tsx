import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { PartnerTable } from "../../components/PartnerTable/PartnerTable";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import { Footer, Navbar, Sidebar } from "../../components";

export const Partner: React.FC = (): JSX.Element => {
  const { getAllPartner } = usePartnerAction();
  const partners = useAppSelector((state) => state.partner.partners);

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
        <div className="flex-grow overflow-y-auto">
          <PartnerTable currentPartner={partners} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partner;
