import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { IUser } from "../../../utils/types";
import { format } from "date-fns";
import { useAppSelector } from "../../../redux/hooks";
import Pagination from "../../Pagination/Pagination";
import FormUsers from "../../Forms/Users/FormUsers";
import { PiNotePencil } from "react-icons/pi";
import { useUserAction } from "../../../redux/Actions/userAction";
import { useRolesAction } from "../../../redux/Actions/rolesAction";
import Modal from "../../Modal/Modal";
import DeleteButton from "../../Buttons/DeleteButton";
import { toast } from "sonner";

const TABLE_HEAD = ["Nombre", "Email", "rol", "Estado", "Creado", "Opciones"];

export const UserTable: React.FC<{ currentUser: IUser[] }> = ({
  currentUser,
}): JSX.Element => {
  const users = useAppSelector((state) => state.user.users);

  const { getAllUser, deleteUserAction } = useUserAction();
  const { getAllRoles } = useRolesAction();

  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  const [editingPart, setEditingPart] = useState<string | null | undefined>(
    null
  );

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

  useEffect(() => {
    getAllUser();
    getAllRoles();
  }, []);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <form className="flex items-center">
        <input
          value={search}
          name="search"
          className="px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-800"
          type="text"
          placeholder="Search for Partners..."
          onChange={handleSearchChange}
        />
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm shadow-md text-left text-gray-500 divide-y divide-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="p-3 border-b border border-slate-300">
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
            {filteredItems.map((user, index) => {
              const isEven = index % 2 === 0;
              const rowClass = isEven ? "bg-silver dark:bg-[#676768]" : "";

              const formattedDate = user.createdAt
                ? format(new Date(user.createdAt), "yyyy-MM-dd HH:mm:ss")
                : "";

              const isActive = user.stateId === "active";
              const suspent = user.stateId === "suspend";

              return (
                <tr key={index} className={rowClass}>
                  <td className="p-3 border border-slate-300">
                    <Typography
                      color="blue-gray"
                      className="cursor-pointer text-blue-500 font-semibold"
                    >
                      {user.name}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {user.rol}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <div
                      className={`rounded-lg w-24 h-8 flex items-center justify-center ${
                        isActive
                          ? "bg-green-500 text-lg"
                          : suspent
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      <Typography color="white">
                        {isActive
                          ? "Activo"
                          : suspent
                          ? "Suspendido"
                          : "Inactivo"}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {formattedDate}
                    </Typography>
                  </td>
                  <td className="p-3 border border-slate-300">
                    <>
                      <button
                        disabled={
                          !userRole ||
                          !userRole.permissions.includes("EditarSocio")
                        }
                        onClick={() => setEditingPart(user?._id)}
                        className="bg-blue-500 px-1 hover:bg-blue-800 text-white font-bolt rounded"
                      >
                        <PiNotePencil size="30" />
                      </button>
                      {editingPart === user._id && (
                        <Modal
                          open={editingPart !== null}
                          onClose={() => setEditingPart(null)}
                        >
                          <div className="flex flex-col z-10 gap-4">
                            <FormUsers
                              userToEdit={user}
                              setEditingUser={() => setEditingPart(null)}
                            />
                          </div>
                        </Modal>
                      )}
                    </>
                    <>
                      <DeleteButton
                        onDelete={() => {
                          if (user._id) {
                            deleteUserAction(user?._id);
                            toast("Socio Borrado", {
                              description: `El Socio ${user.name} fue borrado del sistema`,
                            });
                          } else {
                            console.error("Error: part._id is undefined");
                          }
                        }}
                        confirmationMessage="Desea borrarlo?"
                        userRole={userRole}
                        requiredPermission="eliminarSocio"
                      />
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
