import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/hooks";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";
import { Typography } from "@material-tailwind/react";
import DeleteButton from "../../Buttons/DeleteButton";
import { toast, Toaster } from "sonner";
import Pagination from "../../Pagination/Pagination";

const TABLE_HEAD = ["Socio", "Fecha de ingreso", "Estado", "Opciones"];

export const IncomeTable: React.FC<{ currentIncome: IIncome[] }> = ({
  currentIncome,
}): JSX.Element => {
  const { getAllIncomeOfTheDay, deleteIncomeAction } = useIncomeAction();

  const income = useAppSelector((state) => state.income.income);
  const partner = useAppSelector((state) => state.partner.partners);
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = [...currentIncome]
    .reverse()
    .slice(indexOfFirstCourse, indexOfLastItems);

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
    getAllIncomeOfTheDay();
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
          {filteredItems.map((inc, index) => {
            const partnerItem = partner.find(
              ({ _id }) => _id === inc.partnerId
            );
            if (!partnerItem) return null;
            const isEvenRow = index % 2 === 0;
            const rowClass = isEvenRow ? "bg-silver dark:bg-[#676768]" : "";

            const formattedDate = inc.createdAt
              ? format(new Date(inc.createdAt), "dd-MM-yyyy HH:mm:ss")
              : "";

            const isActive = inc.stateId === "active";

            return (
              <tr key={index} className={rowClass}>
                <td className="p-3  border border-slate-300">
                  <div className="flex items-center">
                    <Typography
                      color="blue-gray"
                      className="cursor-pointer text-blue-500 font-semibold"
                    >
                      {partnerItem.firstName} {partnerItem.lastName}
                    </Typography>
                  </div>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {formattedDate}
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
                <td className="p-3 border border-slate-300 flex ">
                  <>
                    <DeleteButton
                      onDelete={() => {
                        if (partnerItem._id) {
                          deleteIncomeAction(partnerItem._id);
                          toast("Socio Borrado", {
                            description: `El Socio ${partnerItem.firstName} ${partnerItem.lastName} fue borrado del sistema`,
                          });
                        } else {
                          console.error("Error: part._id is undefined");
                        }
                      }}
                    
                      userRole={userRole}
                      requiredPermission="EliminarIngresos"
                    />
                  </>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Toaster />
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
