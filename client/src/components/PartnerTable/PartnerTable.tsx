import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { IPartner } from "../../utils/types";
import corazonRoto from "../../Images/corazonRoto.png";
import corazonSano from "../../Images/corazonSano.png";
import { format } from "date-fns";

const TABLE_HEAD = [
  // "#",
  "Nombre y Apellido",
  "DNI",
  "foto",
  "Telefono",
  "Estado",
  "Creado",
  "Opciones",
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            (
              { firstName, dni, phone, stateId, condition, createdAt },
              index
            ) => {
              const isLast = index === currentPartner.length - 1;
              const classes = isLast
                ? "p-3 border border-slate-300"
                : "p-3 border border-slate-300";

              const RowClass =
                index % 2 === 0 ? "bg-silver dark:bg-[#676768]" : "";

              const formattedDate = createdAt
                ? format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")
                : "";

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
                          <span className="text-red-600 mt-1">{""}No Apto</span>
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
                      <img
                        src={corazonSano}
                        alt="Corazón sano"
                        className="w-9 h-5 mr-1"
                      />
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography color="blue-gray" className="font-semibold">
                      {phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      color="blue-gray"
                      className="p-2 text-sm text-center font-medium uppercase tracking-wider text-white bg-green-900 rounded-lg"
                    >
                      {stateId}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      color="blue-gray"
                      className="font-semibold -mr-2"
                    >
                      {formattedDate}
                    </Typography>
                  </td>
                  {/* <td className={classes}>
                      <Typography
                        color="blue-gray"
                        className="font-semibold"
                      ></Typography>
                    </td> */}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className="pagination justify-center dark:bg-[#27272a]">
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
    </div>
  );
};
