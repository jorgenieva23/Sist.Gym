import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { IPayments } from "../../../utils/types";
import { PiNotePencil } from "react-icons/pi";
import { format } from "date-fns";
import FormatDate from "../../../utils/FormatDate";
import Pagination from "../../Pagination/Pagination";
import { useAppSelector } from "../../../redux/hooks";
import { usePaymentAction } from "../../../redux/Actions/paymentActions";
import { toast, Toaster } from "sonner";
import Modal from "../../Modal/Modal";
import FormPayment from "../../Forms/Payment/FormPayment";
// import ToggleButton from "../../Buttons/ToggleButton";
import DeleteButton from "../../Buttons/DeleteButton";

const TABLE_HEAD = [
  // "#",
  "Socio",
  "Promoción Aplicada",
  "Fecha Desde",
  "Fecha Hasta",
  "Monto",
  "Total",
  "Estado",
  "Creada",
  "Opciones",
];

export const PaymentTable: React.FC<{ currentPayments: IPayments[] }> = ({
  currentPayments,
}): JSX.Element => {
  const { getAllPayment, removePayment } = usePaymentAction();
  const payment = useAppSelector((state) => state.payment.payments);
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
  const currentItems = currentPayments.slice(
    indexOfFirstCourse,
    indexOfLastItems
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = currentItems.filter((payment) =>
    `${payment.partnerId} ${payment.promotionId} ${payment.dateFrom}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  useEffect(() => {
    getAllPayment();
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
          {filteredItems.reverse().map((paym, index) => {
            const isEvenRow = index % 2 === 0;
            const rowClass = isEvenRow ? "bg-gray-200" : "";

            const formattedDate = paym.createdAt
              ? format(new Date(paym.createdAt), "dd-MM-yyyy HH:mm:ss")
              : "";

            const formatDateFrom = FormatDate(paym.dateFrom);
            const formatDateTo = FormatDate(paym.dateTo);

            const isActive = paym.stateId === "active";

            return (
              <tr key={index} className={rowClass}>
                <td className="p-3  border border-slate-300">
                  <div className="flex items-center">
                    <Typography
                      color="blue-gray"
                      className="cursor-pointer text-base text-blue-500 font-semibold"
                    >
                      {paym.partnerId}
                    </Typography>
                  </div>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {paym.promotionId ? `${paym.promotionId}` : `ninguna`}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {formatDateFrom}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    {formatDateTo}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    ${paym.amount}
                  </Typography>
                </td>
                <td className="p-3 border border-slate-300">
                  <Typography color="blue-gray" className="font-semibold">
                    ${paym.total}
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
                <td className="p-3 border border-slate-300">
                  {/* Boton que edita el pago */}
                  <>
                    <button
                      disabled={
                        !userRole ||
                        !userRole.permissions.includes("EditarSocio")
                      }
                      onClick={() => setEditingPart(paym?._id)}
                      className="bg-blue-500 px-1 hover:bg-blue-800 text-white font-bolt rounded"
                    >
                      <PiNotePencil size="30" />
                    </button>
                    {editingPart === paym._id && (
                      <Modal
                        open={editingPart !== null}
                        onClose={() => setEditingPart(null)}
                      >
                        <div className="flex flex-col z-10 gap-4">
                          <FormPayment
                            paymentToEdit={paym}
                            setEditingPayment={() => setEditingPart(null)}
                          />
                        </div>
                      </Modal>
                    )}
                  </>
                  {/* Boton que borra el pago */}
                  <>
                    <DeleteButton
                      onDelete={() => {
                        if (paym._id) {
                          removePayment(paym._id);
                          toast("Promocion Borrada", {
                            description: `La promocion fue borrado del sistema`,
                          });
                        } else {
                          console.error("Error: part._id is undefined");
                        }
                      }}
                      
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
      <Toaster />
      <div className="flex justify-center mt-4">
        {payment.length < 7 ? (
          `mostrando ${payment.length} pagos`
        ) : (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            maxLength={7}
            totalItems={payment.length}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};
