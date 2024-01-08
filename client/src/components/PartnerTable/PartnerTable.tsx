import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { IPartner } from "../../utils/types";
import corazonRoto from "../../Images/corazonRoto.png";
import corazonSano from "../../Images/corazonSano.png";

const TABLE_HEAD = [
  // "#",
  "Nombre y Apellido",
  "DNI",
  "Telefono",
  "Estado",
  "Creado",
];

export const PartnerTable: React.FC<{
  currentPartner: IPartner[];
}> = ({ currentPartner }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 2;

  console.log(currentPartner);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentDataToShow = currentPartner.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(currentDataToShow.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="shadow-4xl px-[20px] rounded-md">
      <Card className="dark:bg-[#27272a]">
        <table className="hidden md:table min-w-max border-separate border border-slate-400 table-auto text-left rounded-md dark:bg-[#27272a]">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border border-slate-300 p-4">
                  <Typography
                    variant="small"
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
            {currentPartner.map(
              ({ firstName, dni, phone, stateId, condition }, index) => {
                const isLast = index === currentPartner.length - 1;
                const classes = isLast
                  ? "p-3 border border-slate-300"
                  : "p-3 border border-slate-300";

                const RowClass =
                  index % 2 === 0 ? "bg-silver dark:bg-[#676768]" : "";
                const PaidClass = stateId
                  ? "bg-green text-[#27272a]"
                  : "bg-[#e11d48] text-[#3b3b3e]";
                const PaidText =
                  stateId === "active" ? "Suscripto" : "No Suscripto";

                return (
                  <tr key={index} className={RowClass}>
                    <td className={classes}>
                      <Typography
                        color="blue-gray"
                        className="cursor-pointer text-blue-500 font-semibold"
                      >
                        {firstName}
                      </Typography>
                      <div className="flex items-center">
                        {condition === "fit" ? (
                          <>
                            <img
                              src={corazonSano}
                              alt="Corazón sano"
                              className="w-9 h-5 mt-2 mr-1"
                            />
                            <span className="text-green mt-1 font-bold text-green-600">
                              Apto
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              src={corazonRoto}
                              alt="Corazón roto"
                              className="w-5 h-5 mt-2 mr-1"
                            />
                            <span className="text-red-600 mt-1">
                              {""}No Apto
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray" className="font-semibold">
                        {dni}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray" className="font-semibold">
                        {phone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray" className="p-2 text-sm text-center font-medium uppercase tracking-wider text-white bg-green-900 rounded-lg">
                        {stateId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div
                        className={` p-2 font-semibold rounded-full ${PaidClass}`}
                      >
                        {PaidText}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <div className="pagination mx-auto dark:bg-[#27272a]">
          <button
            onClick={prevPage}
            className="text-gray dark:text-white font-normal"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-green font-semibold">
            Página {currentPage} de{" "}
            {Math.ceil(currentDataToShow.length / usersPerPage)}
          </span>
          <button
            disabled={
              currentPage >= Math.ceil(currentDataToShow.length / usersPerPage)
            }
            onClick={nextPage}
            className="text-gray dark:text-white font-normal"
          >
            Siguiente
          </button>
        </div>
      </Card>
    </div>
  );
};
