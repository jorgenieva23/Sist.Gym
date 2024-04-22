import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { IRoles } from "../../../utils/types";
import { PiNotePencil } from "react-icons/pi";
import Modal from "../../Modal/Modal";
// import EditButton from "../../Buttons/EditButon";
import FormRoles from "../../Forms/Roles/FormRol";
import Pagination from "../../Pagination/Pagination";
import { useAppSelector } from "../../../redux/hooks";
import { useRolesAction } from "../../../redux/Actions/rolesAction";

const TABLE_HEAD = ["#", "Nombre", "Opciones"];

export const RolesTable: React.FC<{ currentRoles: IRoles[] }> = ({
  currentRoles,
}): JSX.Element => {
  const { getAllRoles } = useRolesAction();
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  const [editingPart, setEditingPart] = useState<string | null | undefined>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 7;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = currentRoles.slice(indexOfFirstCourse, indexOfLastItems);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const filteredItems = currentItems.filter((roles) =>
    `${roles.name}`.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-auto">
      <form className="flex items-center mb-2">
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
          {filteredItems.map((role, index) => {
            const isEvenRow = index % 2 === 0;
            const rowClass = isEvenRow ? "bg-silver dark:bg-[#676768]" : "";

            return (
              <tr key={index} className={rowClass}>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-3  border border-slate-300">
                  <Typography
                    color="blue-gray"
                    className="cursor-pointer text-base text-blue-500 font-semibold"
                  >
                    {role.name}
                  </Typography>
                </td>

                <td className="p-3 border border-slate-300">
                  <>
                    <button
                      disabled={
                        !userRole ||
                        !userRole.permissions.includes("EditarSocio")
                      }
                      onClick={() => setEditingPart(role?._id)}
                      className="bg-blue-500 px-1 hover:bg-blue-800 text-white font-bolt rounded"
                    >
                      <PiNotePencil size="30" />
                    </button>
                    {editingPart === role._id && (
                      <Modal
                        open={editingPart !== null}
                        onClose={() => setEditingPart(null)}
                      >
                        <div className="flex flex-col z-10 gap-4">
                          <FormRoles
                            rolToEdit={role}
                            setEditingRoles={() => setEditingPart(null)}
                          />
                        </div>
                      </Modal>
                    )}
                  </>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {roles.length < 7 ? (
          `N°. de Roles ${roles.length} `
        ) : (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            maxLength={7}
            totalItems={roles.length}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
