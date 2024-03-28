import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import { usePartnerAction } from "../../redux/Actions/partnerAction";

export const PartnerDetail: React.FC = (): JSX.Element => {
  const { _id } = useParams<{ _id: string }>();
  const { getSpecificPartnerById, clearSpecificPartnerById } =
    usePartnerAction();
  const specificPartner = useAppSelector(
    (state) => state.partner.specificPartner
  );

  useEffect(() => {
    if (_id) {
      getSpecificPartnerById(_id);
    }
    return () => {
      clearSpecificPartnerById();
    };
  }, [_id]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="max-w-md mx-auto flex-grow">
          {specificPartner && (
            <div>
              <p>Nombre: {specificPartner.firstName}</p>
              <p>Apellido: {specificPartner.lastName}</p>
              <p>Email: {specificPartner.email}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
