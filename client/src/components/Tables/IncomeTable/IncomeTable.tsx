import React, { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { IIncome } from "../../../utils/types";
import Pagination from "../../Pagination/Pagination";
import { useAppSelector } from "../../../redux/hooks";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";
import { Typography } from "@material-tailwind/react";
import { PiNotePencil, PiTrash, PiXCircle } from "react-icons/pi";

const TABLE_HEAD = [
  // "#",
  "Socio",
  "Fecha de ingreso",
  "Estado",
  "Opciones",
];

export const IncomeTable: React.FC<{ currentIncome: IIncome[] }> = ({
  currentIncome,
}): JSX.Element => {
  const { getAllIncome } = useIncomeAction();
  const income = useAppSelector((state) => state.income.income);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = currentIncome.slice(
    indexOfFirstCourse,
    indexOfLastItems
  );
  const today = new Date();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = currentItems.filter((income) =>
    `${income.partnerId} ${income.dateOfAdmission} ${income.stateId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllIncome();
  }, []);

  return (
    <>
      <form className="flexitems-center">
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
        <thead className="text-lg  text-gray-700 uppercase bg-gray-50 ">
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
          {filteredItems
            // .filter(
            //   (e) => e.createdAt && isSameDay(new Date(e.createdAt), today)
            // )
            .reverse()
            .map(({ partnerId, stateId, createdAt }, index) => {
              const isEvenRow = index % 2 === 0;
              const rowClass = isEvenRow ? "bg-silver dark:bg-[#676768]" : "";

              const formattedDate = createdAt
                ? format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")
                : "";

              const isActive = stateId === "active";

              return (
                <tr key={index} className={rowClass}>
                  <td className="p-3  border border-slate-300">
                    <div className="flex items-center">
                      <Typography
                        color="blue-gray"
                        className="cursor-pointer text-blue-500 font-semibold"
                      >
                        {partnerId}
                      </Typography>
                    </div>
                  </td>
                  {/* <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {dateOfAdmission}
                    </Typography>
                  </td> */}
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
                    <button className="bg-blue-500 hover:bg-blue-800 text-white font-bolt rounded">
                      <PiNotePencil size="30" />
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-800 text-white font-bolt rounded">
                      <PiXCircle size="30" />
                    </button>
                    <button className="bg-red-500 hover:bg-red-800 text-white font-bolt rounded">
                      <PiTrash size="30" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          maxLength={7}
          totalItems={income.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default IncomeTable;
