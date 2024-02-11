import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { IUser } from "../../../utils/types";
import { format } from "date-fns";
import { useAppSelector } from "../../../redux/store";
import Pagination from "../../Pagination/Pagination";

const TABLE_HEAD = ["Nombre", "Email", "rol", "Estado", "Creado", "Opciones"];

export const UserTable: React.FC<{ currentUser: IUser[] }> = ({
  currentUser,
}): JSX.Element => {
  const users = useAppSelector((state) => state.user.users);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 4;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = currentUser.slice(indexOfFirstCourse, indexOfLastItems);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = currentItems.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={index} className="border-b border border-slate-300 p-4">
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
            ({ name, email, rol, stateId, createdAt }, index) => {
              const isEven = index % 2 === 0;
              const rowClass = isEven ? "bg-silver dark:bg-[#676768]" : "";

              const formattedDate = createdAt
                ? format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")
                : "";

              const isActive = stateId === "active";

              return (
                <tr key={index} className={rowClass}>
                  <td className="p-3 border border-slate-300">
                    <Typography
                      color="blue-gray"
                      className="cursor-pointer text-blue-500 font-semibold"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {email}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {rol}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <div className="flex items-center">
                      <div
                        className={` rounded-lg w-24 h-8 mr-10 flex items-center justify-center ${
                          isActive ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        <Typography color="white" className="text-lg">
                          {isActive ? "Activo" : "Inactivo"}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {formattedDate}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    {/* Opciones */}
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
          totalItems={users.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
