import React, { useEffect } from "react";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import { IPartner } from "../../utils/types";
import img from "../../assets/img.jpeg";
import { NavLink } from "react-router-dom";

interface CardPartnerProps {
  partner: IPartner[];
}

const CardPartner: React.FC<CardPartnerProps> = ({ partner }) => {
  const { getAllPartner } = usePartnerAction();

  const Birthday = (date: Date) => {
    const today = new Date();
    const dob = new Date(date);
    return (
      dob.getUTCDate() === today.getUTCDate() &&
      dob.getUTCMonth() === today.getUTCMonth()
    );
  };

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div>
      <div className="relative flex flex-wrap mx-auto justify-center">
        {partner
          .filter((partner) => Birthday(new Date(partner.date)))
          .map((partner) => (
            <NavLink
              to={`/partner/${partner._id}`}
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <div
                key={partner._id}
                className="relative min-w-[40px] bg-white shadow-md rounded-3xl p-2 mx-1  cursor-pointer"
              >
                <div className=" overflow-x-hidden rounded-2xl relative">
                  <img
                    className="h-24 rounded-2xl w-full object-cover"
                    src={partner.picture ? partner.picture : img}
                    alt="Imagen"
                  />
                </div>
                <div className="mt-4 pl-2 mb-2 flex justify-between ">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 mb-0">
                      {partner.firstName} {partner.lastName}
                    </p>
                    <p className="text-md text-gray-800 mt-0">
                      {partner.phone}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default CardPartner;
