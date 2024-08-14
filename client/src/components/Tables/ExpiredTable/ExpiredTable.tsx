"use client";
import React, { useState, useEffect } from "react";
import FormatDate from "../../../utils/FormatDate";
import { Typography } from "@material-tailwind/react";
import { useAppSelector } from "../../../redux/hooks";
import { NavLink } from "react-router-dom";
import { usePaymentAction } from "../../../redux/Actions/paymentActions";

interface ExpiredPaymentProps {
  selectedButton: string;
}

const TABLE_HEAD = ["Socio", "Email", "vencimiento", "telefono"];

export const ExpiredPayment: React.FC<ExpiredPaymentProps> = ({
  selectedButton,
}) => {
  const { getAllExpiredPayment } = usePaymentAction();
  const expired = useAppSelector((state) => state.payment.paymentExpired);
  const partner = useAppSelector((state) => state.partner.partners);

  const [dataToShow, setDataToShow] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (expired && expired.dueToday && "dueTomorrow" in expired) {
      switch (selectedButton) {
        case "vencen hoy":
          setCurrentPage(1);
          setDataToShow(expired.dueToday);
          break;
        case "a vencer mañana":
          setCurrentPage(1);
          setDataToShow(expired.dueTomorrow);
          break;
        default:
          setCurrentPage(1);
          setDataToShow(expired.dueToday);
      }
    }
  }, [expired, partner, selectedButton]);

  useEffect(() => {
    getAllExpiredPayment();
  }, []);

  // Calcula los índices de los usuarios a mostrar en la página actual
  const itemsPerPage = 8;
  const reversedUsers = [...dataToShow].reverse();
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = reversedUsers.slice(
    indexOfFirstCourse,
    indexOfLastItems
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm shadow-md text-left text-gray-500 divide-y divide-gray-200">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border border-slate-300 p-4">
                <Typography
                  // variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pay, index) => {
            const partnerItem = partner.find(
              ({ firstName }) => firstName === pay.partnerId
            );

            const formattedDate = FormatDate(pay?.dateTo);

            const isEvenRow = index % 2 === 0;
            const rowClass = isEvenRow ? "bg-gray-200" : "";

            return (
              <tr key={index} className={rowClass}>
                <td className="p-3  border border-slate-300">
                  <div className="flex items-center">
                    <NavLink
                      to={`/partner/${partnerItem?._id}`}
                      style={{
                        color: "inherit",
                        textDecoration: "inherit",
                      }}
                    >
                      <Typography
                        color="blue-gray"
                        className="cursor-pointer text-base text-blue-500 font-semibold"
                      >
                        {partnerItem?.firstName} {partnerItem?.lastName}
                      </Typography>
                    </NavLink>
                  </div>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {partnerItem?.email}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {formattedDate}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {partnerItem?.phone}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
