import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import { usePaymentAction } from "../../../redux/Actions/paymentActions";
import { IPayments } from "../../../utils/types";
import { ClipLoader } from "react-spinners";
import { PiUserCirclePlusLight, PiCalendarLight } from "react-icons/pi";

interface FormProps {
  paymentToEdit?: IPayments;
  setEditingPayment?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionType {
  value: string | undefined;
  label: string | number | undefined;
}

const FormPayment: React.FC<FormProps> = ({
  paymentToEdit,
  setEditingPayment,
}: FormProps): JSX.Element => {
  const { createNewPayment, updatePayment } = usePaymentAction();

  const partners = useAppSelector((state) => state.partner.partners);
  const useAuth = useAppSelector((state) => state.auth.userInfo);
  const creator = useAuth.name;
  const promotion = useAppSelector((state) => state.promotion.promotions);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const optionsPart: OptionType[] = partners.map((part) => ({
    value: part.firstName,
    label: `${part.firstName} ${part.lastName} - DNI: ${part.dni}`,
  }));

  const optionsProm: OptionType[] = promotion.map((part) => ({
    value: part._id,
    label: `${part.name} - ${part.percentage}%`,
  }));

  const validate = (form: IPayments): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};

    if (!form.amount) {
      errors.amount = "El monto es requerido.";
    } else if (form.amount <= 0) {
      errors.amount = "El monto debe ser mayor a cero.";
    }

    if (!form.dateFrom) {
      errors.dateFrom = "La fecha es requerida.";
    }

    if (!form.promotionId) {
      errors.promotionId = "La promoción es requerida.";
    }

    if (!form.partnerId) {
      errors.partnerId = "El socio es requerido.";
    }

    return errors;
  };

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

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoadingSubmit(false);
      return;
    }

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

  useEffect(() => {
    calculateTotal();
  }, [form.amount, form.promotionId]);

  const calculateTotal = () => {
    const selectedPromotion = promotion.find((p) => p._id === form.promotionId);
    const promotionPercentage = selectedPromotion
      ? selectedPromotion.percentage
      : 0;
    const amount = form.amount || 0;
    const total = amount - (amount * promotionPercentage) / 100;
    setTotalAmount(total);
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
            />
          </div>
          {errors.amount && toast.info(errors.amount)}
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Promocion a aplicar
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <Select
              className="rounded-lg border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm"
              name="partnerId"
              value={optionsProm.find(
                (option) => option.value === form.promotionId
              )}
              onChange={(selectedOption: OptionType | null) =>
                setForm({
                  ...form,
                  promotionId: selectedOption ? selectedOption.value || "" : "",
                })
              }
              options={optionsProm}
              menuPortalTarget={document.body} // Añade esta línea
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 200,
                  overflow: "auto",
                }),
              }}
            />
          </div>
          {errors.promotionId && toast.info(errors.promotionId)}
        </div>

        <div className="flex flex-col mt-4">
          <label className="block w-96 mb-1 text-sm font-medium text-gray-900">
            Socio
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiUserCirclePlusLight className=" w-7 h-7 text-black" />
            </span>
            <Select
              className="rounded-lg border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm"
              name="partnerId"
              value={optionsPart.find(
                (option) => option.value === form.partnerId
              )}
              onChange={(selectedOption: OptionType | null) =>
                setForm({
                  ...form,
                  partnerId: selectedOption ? selectedOption.value || "" : "",
                })
              }
              options={optionsPart}
              menuPortalTarget={document.body} // Añade esta línea
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: 200,
                  overflow: "auto",
                }),
              }}
            />
          </div>
          {errors.partnerId && toast.info(errors.partnerId)}
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
            />
          </div>
          {errors.dateFrom && toast.info(errors.dateFrom)}
        </div>
        <p className="mt-2 text-lg font-medium text-gray-900">
          Total: <span className="text-green-600">${totalAmount}</span>
        </p>

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
