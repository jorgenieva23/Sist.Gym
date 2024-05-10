import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { IPromotion } from "../../../utils/types";
import { PiNotePencil } from "react-icons/pi";
import { format } from "date-fns";
import Pagination from "../../Pagination/Pagination";
import { useAppSelector } from "../../../redux/hooks";
import { usePromotionAction } from "../../../redux/Actions/promotionAction";
import {
  // toast,
  Toaster,
} from "sonner";
import Modal from "../../Modal/Modal";
import FormPromotion from "../../Forms/Promotion/PromotionForm";
// import EditButton from "../../Buttons/EditButon";
import ToggleButton from "../../Buttons/ToggleButton";
// import DeleteButton from "../../Buttons/DeleteButton";

const TABLE_HEAD = [
  // "#",
  "Name",
  "Meses/Dias",
  "Description",
  "(%)",
  "State",
  "Created",
  "Options",
];

export const PromotionTable: React.FC<{ currentPromotions: IPromotion[] }> = ({
  currentPromotions,
}): JSX.Element => {
  const {
    getAllPromotion,
    // removePromotion,
    toggleDeletedProm,
  } = usePromotionAction();
  const promotion = useAppSelector((state) => state.promotion.promotions);
  const roles = useAppSelector((state) => state.roles.roles);
  const user = useAppSelector((state) => state.auth.userInfo);

  const userRole = roles.find((role) => role.name === user.rol);

  const [editingPart, setEditingPart] = useState<string | null | undefined>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 8;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastItems - itemsPerPage;
  const currentItems = currentPromotions.slice(
    indexOfFirstCourse,
    indexOfLastItems
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const shouldShowPromotion = (promotion: IPromotion): boolean => {
    if (user.rol === "admin") {
      return true;
    } else if (user.rol === "partner") {
      return promotion.deleted !== true;
    } else {
      return false;
    }
  };

  const filteredItems = currentItems.filter(
    (promotion) =>
      `${promotion.name} ${promotion.percentage}`
        .toLowerCase()
        .includes(search.toLowerCase()) && shouldShowPromotion(promotion)
  );

  useEffect(() => {
    getAllPromotion();
  }, []);

  return (
    <>
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
          {filteredItems.map((prom, index) => {
            const isEvenRow = index % 2 === 0;
            const rowClass = isEvenRow ? "bg-gray-200" : "";

            const formattedDate = prom.createdAt
              ? format(new Date(prom.createdAt), "dd-MM-yyyy")
              : "";

            const isActive = prom.stateId === "active";
            const suspent = prom.stateId === "suspend";

            return (
              <tr key={index} className={rowClass}>
                <td className="p-3  border border-slate-300">
                  <div className="flex items-center">
                    <Typography
                      color="blue-gray"
                      className="cursor-pointer text-base text-blue-500 font-semibold"
                    >
                      {prom.name}
                    </Typography>
                  </div>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {prom.referredDate > 0 && prom.referredDate < 12
                      ? `${prom.referredDate} meses`
                      : `${prom.referredDate} dias`}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {prom.description}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {prom.percentage}
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
                        !userRole.permissions.includes("editarPromocion")
                      }
                      onClick={() => setEditingPart(prom?._id)}
                      className="bg-blue-500 px-1 hover:bg-blue-800 text-white font-bolt rounded"
                    >
                      <PiNotePencil size="30" />
                    </button>
                    {editingPart === prom._id && (
                      <Modal
                        open={editingPart !== null}
                        onClose={() => setEditingPart(null)}
                      >
                        <div className="flex flex-col z-10 gap-4">
                          <FormPromotion
                            promotionToEdit={prom}
                            setEditingPromotion={() => setEditingPart(null)}
                          />
                        </div>
                      </Modal>
                    )}
                  </>
                  <>
                    <ToggleButton
                      partId={prom._id}
                      isDeleted={prom.deleted}
                      toggleDeleted={toggleDeletedProm}
                      userRole={userRole}
                      requiredPermission="suspenderPromocion"
                    />
                  </>
                  {/* <>
                    <DeleteButton
                      onDelete={() => {
                        if (prom._id) {
                          removePromotion(prom._id);
                          toast("Promocion Borrada", {
                            description: `${prom.name} fue borrado del sistema`,
                          });
                        } else {
                          console.error("Error: paym._id is undefined");
                        }
                      }}
                      confirmationMessage="Desea borrarla?"
                      userRole={userRole}
                      requiredPermission="eliminarPromocion"
                    />
                  </> */}
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
          totalItems={promotion.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};
