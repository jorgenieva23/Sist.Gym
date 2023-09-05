import React from "react";
import { useAppSelector } from "../../redux/hooks";
import Cart from "../Cart/Cart";
import { IPartner } from "../../utils/types";

const Container: React.FC<{ currentPartner: IPartner[] }> = ({
  currentPartner,
}): JSX.Element => {
  const allPartner = useAppSelector((state) => state.partner);

  return (
    <>
      {currentPartner.length ? (
        <div>
          {currentPartner.map((partner: IPartner) => (
            <Cart
              firstName={partner.firstName}
              lastName={partner.lastName}
              dni={partner.dni}
              address={partner.address}
              phone={partner.phone}
              email={partner.email}
              date={partner.date}
            //   datePhysicalAttitude={partner.datePhysicalAttitude}
              medicalCoverage={partner.medicalCoverage}
              phoneEmergency={partner.phoneEmergency}
              phoneEmergencyName={partner.phoneEmergencyName}
            />
          ))}
        </div>
      ) : !currentPartner.length &&
        Array.isArray(allPartner.filteredPartners) &&
        allPartner.filteredPartners.length ? (
        <div className="no-parner">
          <h2> no hay socios </h2>
        </div>
      ) : (
        <h2>cargando...</h2>
      )}
    </>
  );
};

export default Container