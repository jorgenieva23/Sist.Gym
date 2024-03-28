import React, { useState } from "react";
import { format } from "date-fns";
import { IMovement } from "../../../utils/types";
import Pagination from "../../Pagination/Pagination";
import { useAppSelector } from "../../../redux/hooks";
import { Typography } from "@material-tailwind/react";
import { PiNotePencil, PiTrash, PiXCircle } from "react-icons/pi";

const TABLE_HEAD = [
  // "#",
  "Socio",
  "Fecha de ingreso",
  "Estado",
  "Opciones",
];

export const MovementTable: React.FC<{ currentMovement: IMovement[] }> = ({
  currentMovement,
}): JSX.Element => {
  const movement = useAppSelector((state) => state.movement.movement);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = currentMovement.slice(
    indexOfFirstCourse,
    indexOfLastItems
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = currentItems.filter((movement) =>
    `${movement.movementType} ${movement.creatorId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
          {filteredItems.reverse().map(
            ({ movementType, creatorId, createdAt, ip }, index) => {
              const isEvenRow = index % 2 === 0;
              const rowClass = isEvenRow ? "bg-silver dark:bg-[#676768]" : "";

              const formattedDate = createdAt
                ? format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")
                : "";

              return (
                <tr key={index} className={rowClass}>
                  <td className="p-3  border border-slate-300">
                    <div className="flex items-center">
                      <Typography
                        color="blue-gray"
                        className="cursor-pointer text-blue-500 font-semibold"
                      >
                        {movementType}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {creatorId}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {ip}
                    </Typography>
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
            }
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          maxLength={7}
          totalItems={movement.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default MovementTable;
