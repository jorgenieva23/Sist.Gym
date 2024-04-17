import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { IPartner } from "../../../utils/types";
import corazonRoto from "../../../Images/corazonRoto.png";
import corazonSano from "../../../Images/corazonSano.png";
import { PiImage, PiTrash } from "react-icons/pi";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import FormPartners from "../../Forms/Partners/FormPartners";
import Modal from "../../Modal/Modal";
import Pagination from "../../Pagination/Pagination";
import EditButton from "../../Buttons/EditButon";
import { useAppSelector } from "../../../redux/hooks";
import { usePartnerAction } from "../../../redux/Actions/partnerAction";
import { Toaster, toast } from "sonner";
import {
  AiOutlineCheckCircle as ReactivateIcon,
  AiOutlineCloseCircle as SuspendIcon,
} from "react-icons/ai";

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
  const { getAllPartner, removePartner, toggleDeleted } = usePartnerAction();
  const partners = useAppSelector((state) => state.partner.partners);
  const user = useAppSelector((state) => state.auth.userInfo);
  console.log(user.rol, "hola");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<string | null | undefined>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null
  );

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

  const shouldShowPartner = (partner: IPartner): boolean => {
    if (user.rol === "admin") {
      return true;
    } else if (user.rol === "partner") {
      return partner.deleted !== true;
    } else {
      return false;
    }
  };

  const filteredItems = currentItems
    .filter(
      (partner) =>
        `${partner.firstName} ${partner.lastName} ${partner.dni}`
          .toLowerCase()
          .includes(search.toLowerCase()) && shouldShowPartner(partner)
    )
    .reverse();

  useEffect(() => {
    getAllPartner();
  }, []);

  return (
    <div>
      <form className="flex items-center mb-2">
        <input
          value={search}
          name="search"
          className="px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:border-blue-800 "
          type="text"
          placeholder="Search for Partners..."
          onChange={handleSearchChange}
        />
        {/* <h1>{`socios activos : ${filteredItems.length}`}</h1> */}
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm shadow-md text-left text-gray-500 divide-y divide-gray-200">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="p-3 border-b border-slate-300">
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
            {filteredItems.map((part, index) => {
              const isEvenRow = index % 2 === 0;
              const rowClass = isEvenRow ? "bg-silver dark:bg-[#676768] " : "";

              const formattedDate = part.createdAt
                ? format(new Date(part.createdAt), "dd-MM-yyyy")
                : "";

              const isActive = part.stateId === "active";
              const suspent = part.stateId === "suspend";

              return (
                <tr key={index} className={rowClass}>
                  <td className="p-3  border border-slate-300">
                    <div className="flex items-center">
                      <NavLink
                        to={`/partner/${part._id}`}
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                      >
                        <Typography
                          color="blue-gray"
                          className="cursor-pointer text-base text-blue-500 font-semibold"
                        >
                          {part.firstName} {part.lastName}
                        </Typography>
                      </NavLink>
                      <div className="flex items-center ml-2">
                        {part.condition === "fit" ? (
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
                      {part.dni}
                    </Typography>
                  </td>
                  <td className="p-3 border-b border-slate-300">
                    <button
                      onClick={() => {
                        if (part?.picture) {
                          setSelectedImage(part.picture || "");
                          setIsModalOpen(part?._id);
                        }
                      }}
                    >
                      <PiImage
                        size="30"
                        className={part.picture ? "text-[#22c55e]" : ""}
                      />
                    </button>
                    {isModalOpen === part._id && (
                      <Modal
                        open={isModalOpen !== null}
                        onClose={() => setIsModalOpen(null)}
                      >
                        {selectedImage && (
                          <img src={selectedImage} alt="Selected" />
                        )}
                      </Modal>
                    )}
                  </td>
                  <td className="p-3 border border-slate-300">
                    <Typography color="blue-gray" className="font-semibold">
                      {part.phone}
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
                      <EditButton
                        item={part?._id}
                        FormComponent={FormPartners}
                      />
                    </>
                    <>
                      <button
                        onClick={() => part._id && toggleDeleted(part._id)}
                        className={`px-1 hover:bg-yellow-800 text-white font-bolt rounded ${
                          part.deleted ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      >
                        {part.deleted ? (
                          <ReactivateIcon size="30" />
                        ) : (
                          <SuspendIcon size="30" />
                        )}
                      </button>
                    </>
                    <>
                      <button
                        onClick={() => {
                          toast.info("Desea borrarlo?", {
                            action: {
                              label: "Borrar",
                              onClick: () => {
                                if (part._id) {
                                  removePartner(part._id);
                                  toast("Socio Borrado", {
                                    description: `El Socio ${part.firstName} ${part.lastName} fue borrado del sistema`,
                                  });
                                } else {
                                  console.error("Error: part._id is undefined");
                                }
                              },
                            },
                          });
                        }}
                        className="bg-red-500 px-1 hover:bg-red-800 text-white font-bolt rounded"
                      >
                        <PiTrash size="30" />
                      </button>
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Toaster richColors position="bottom-center" />
      <div className="flex justify-center mt-4">
        {partners.length < 7 ? (
          `N°. de socios: ${partners.length} `
        ) : (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            maxLength={7}
            totalItems={partners.length}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
