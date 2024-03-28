import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { usePaymentAction } from "../../../redux/Actions/paymentActions";
import { IPayments } from "../../../utils/types";
import { ClipLoader } from "react-spinners";
import { PiUserCirclePlusLight, PiCalendarLight } from "react-icons/pi";

interface FormProps {
  paymentToEdit?: IPayments;
  setEditingPayment?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormPayment: React.FC<FormProps> = ({
  paymentToEdit,
  setEditingPayment,
}: FormProps): JSX.Element => {
  const { createNewPayment, updatePayment } = usePaymentAction();
  // getSpecificPromotion

  const partners = useAppSelector((state) => state.partner.partners);
  const useAuth = useAppSelector((state) => state.auth.userInfo);
  const creator = useAuth[0].name;
  const promotion = useAppSelector((state) => state.promotion.promotions);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = !!paymentToEdit;

  const [form, setForm] = useState<IPayments>({
    amount: isEditing ? paymentToEdit?.amount : 0,
    dateFrom: isEditing ? paymentToEdit?.dateFrom : 0,
    promotionId: isEditing ? paymentToEdit?.promotionId : "",
    partnerId: isEditing ? paymentToEdit?.partnerId : "",
    stateId: "active",
    creatorId: creator || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    if (isEditing && paymentToEdit && paymentToEdit._id) {
      updatePayment(paymentToEdit._id, form).then(() => {
        setLoadingSubmit(false);
        setEditingPayment && setEditingPayment(false);
        window.location.reload();
      });
    } else {
      await createNewPayment(form).then(() => {
        setLoadingSubmit(false);
      });
      setForm({
        amount: 0,
        dateFrom: 0,
        promotionId: "",
        partnerId: "",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {!isEditing ? "Crear nuevo pago" : "Editar pago"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Monto
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="number"
              name="amount"
              placeholder="Monto"
              min="0"
              value={form.amount}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Promocion a aplicar
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <select
              className="rounded-none rounded-e-lg bg-gray-50 border
              border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm
              p-2.5 "
              name="promotionId"
              placeholder="promotionId"
              value={form.promotionId}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">seleccione la promocion</option>
              {promotion.map((part) => (
                <option key={part.name} value={`${part.name}`}>
                  {part.name} - {part.percentage}%
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block w-96 mb-1 text-sm font-medium text-gray-900">
            Socio
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiUserCirclePlusLight className=" w-7 h-7 text-black" />
            </span>
            <select
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              name="partnerId"
              value={form.partnerId}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">seleccione al socio</option>
              {partners.map((part) => (
                <option key={part.firstName} value={`${part.firstName}`}>
                  {part.firstName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Fecha de inicio
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="date"
              name="dateFrom"
              placeholder="Fecha de inicio"
              value={form.dateFrom}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          {!loadingSubmit ? (
            <button
              className="px-4 py-2 rounded-none rounded-e-lg text-sm font-semibold text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-400"
              type="submit"
            >
              {!isEditing ? "Registrar Pago" : "Guardar cambios"}
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-none rounded-e-lg text-sm font-semibold text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-400"
              type="submit"
            >
              <ClipLoader className="block mx-auto mt-1" size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormPayment;
