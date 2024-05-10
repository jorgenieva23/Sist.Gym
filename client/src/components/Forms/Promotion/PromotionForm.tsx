import React, { useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import { usePromotionAction } from "../../../redux/Actions/promotionAction";
import { IPromotion } from "../../../utils/types";
import { ClipLoader } from "react-spinners";
import { PiCalendarLight } from "react-icons/pi";

interface FormProps {
  promotionToEdit?: IPromotion;
  setEditingPromotion?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormPromotion: React.FC<FormProps> = ({
  promotionToEdit,
  setEditingPromotion,
}: FormProps): JSX.Element => {
  const { createNewPromotion, updatePromotion } = usePromotionAction();

  const useAuth = useAppSelector((state) => state.auth.userInfo);
  const creator = useAuth?.name;
  // const promotion = useAppSelector((state)=> state.promotion.primotion)

  const [errors] = useState<{ [key: string]: string }>({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = !!promotionToEdit;

  const [form, setForm] = useState<IPromotion>({
    name: isEditing ? promotionToEdit?.name : "",
    percentage: isEditing ? promotionToEdit?.percentage : 0,
    referredDate: isEditing ? promotionToEdit?.referredDate : 0,
    description: isEditing ? promotionToEdit?.description : "",
    stateId: "active",
    creatorId: creator || "",
  });

  const validate = (form: IPromotion): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};

    if (!form.name) {
      errors.name = "Debe haber un nombre";
    }
    // if (!form.percentage) {
    //   errors.date = "Debe tener una fecha";
    // }
    if (!form.referredDate) {
      errors.date = "Debe tener una fecha";
    }
    // if (!form.description) {
    //   errors.date = "Debe tener una fecha";
    // }
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors);
      errorMessages.forEach((errorMessage) => toast.error(errorMessage));
      setLoadingSubmit(false);
      return;
    }

    try {
      if (isEditing && promotionToEdit && promotionToEdit._id) {
        updatePromotion(promotionToEdit._id, form).then(() => {
          setLoadingSubmit(false);
          setEditingPromotion && setEditingPromotion(false);
          window.location.reload();
        });
      } else {
        createNewPromotion(form).then(() => {
          setLoadingSubmit(false);
          window.location.reload();
        });
        setForm({
          name: "",
          percentage: 0,
          referredDate: 0,
          description: "",
        });
      }
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
    } finally {
      setLoadingSubmit(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {!isEditing ? "Crear nueva promocion" : "Editar promocion"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-8">
          <label className="block w-96 mb-1 text-sm font-medium text-gray-900">
            Nombre de la Promocion
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="text"
              name="name"
              placeholder="Ej: Media cuota - 15 dias"
              value={form.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.name && toast.info(errors.name)}
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Descuento %
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="number"
              name="percentage"
              placeholder="0 a 100"
              value={form.percentage}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.percentage && toast.info(errors.percentage)}
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Meses/Dias
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="number"
              name="referredDate"
              placeholder="1 a 12 Meses / 15 a 45 Dias"
              value={form.referredDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.referredDate && toast.info(errors.referredDate)}
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Descripcion
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="text"
              name="description"
              value={form.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.description && toast.info(errors.description)}
        </div>

        <div className="flex justify-center mt-4">
          {!loadingSubmit ? (
            <button
              className="px-4 py-2 rounded-none rounded-e-lg text-sm font-semibold text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-400"
              type="submit"
            >
              {!isEditing ? "Registrar Promocion" : "Guardar cambios"}
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

export default FormPromotion;
