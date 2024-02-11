import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { IPartner } from "../../../utils/types";
import corazonRoto from "../../../Images/corazonRoto.png";
import corazonSano from "../../../Images/corazonSano.png";
import { PiImage, PiNotePencil, PiTrash, PiXCircle } from "react-icons/pi";
import { format } from "date-fns";
import Pagination from "../../Pagination/Pagination";
import { useAppSelector } from "../../../redux/store";

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

export const PartnerTable: React.FC<{ currentPartner: IPartner[] }> = ({
  currentPartner,
}): JSX.Element => {
  const partners = useAppSelector((state) => state.partner.partners);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = currentPartner.slice(
    indexOfFirstCourse,
    indexOfLastItems
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = currentItems.filter((partner) =>
    `${partner.firstName} ${partner.lastName} ${partner.dni}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <form className="flex items-center">
        <input
          value={search}
          name="search"
          className="px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-800 "
          type="text"
          placeholder="Search for Partners..."
          onChange={handleSearchChange}
        />
      </form>
      <table className="w-full text-sm shadow-md text-left text-gray-500">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 ">
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
          {filteredItems.map(
            (
              {
                firstName,
                lastName,
                dni,
                phone,
                stateId,
                condition,
                createdAt,
              },
              index
            ) => {
              const isEvenRow = index % 2 === 0;
              const rowClass = isEvenRow ? "bg-silver dark:bg-[#676768]" : "";

              const formattedDate = createdAt
                ? format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")
                : "";

              const isActive = stateId === "active";

              return (
                <tr key={index} className={rowClass}>
                  <td className="p-3 border border-slate-300">
                    <div className="flex items-center">
                      <Typography
                        color="blue-gray"
                        className="cursor-pointer text-blue-500 font-semibold"
                      >
                        {firstName} {lastName}
                      </Typography>
                      <div className="flex items-center ml-2">
                        {condition === "fit" ? (
                          <>
                            <span className="text-green-600 w-10 font-semibold">
                              Apto
                            </span>
                            <img
                              src={corazonSano}
                              alt="Corazón sano"
                              className="w-10 h-5 mr-1"
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-red-600">No Apto</span>
                            <img
                              src={corazonRoto}
                              alt="Corazón roto"
                              className="w-5 h-5 mr-1"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {dni}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300 text-center">
                    <PiImage size="30" />
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {phone}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <div
                      className={`rounded-lg w-20 h-8 flex items-center justify-center ${
                        isActive ? "bg-green-500 text-lg" : "bg-red-500"
                      }`}
                    >
                      <Typography color="white">
                        {isActive ? "Activo" : "Inactivo"}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {formattedDate}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300 flex ">
                    <PiNotePencil
                      size="30"
                      className="text-black bg-blue-500 rounded-sm"
                    />
                    <PiXCircle
                      size="30"
                      className="text-black bg-yellow-500 rounded-sm"
                    />
                    <PiTrash
                      size="30"
                      className="text-black bg-red-500 rounded-sm"
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          maxLength={7}
          totalItems={partners.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
