import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/store";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";
import { PiUserCirclePlusLight, PiCalendarLight } from "react-icons/pi";

interface FormProps {
  incomeToEdit?: IIncome;
  setEditingIncome?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FromIncome: React.FC<FormProps> = ({
  incomeToEdit,
  setEditingIncome,
}: FormProps): JSX.Element => {
  const { createNewIncome, updateIncome } = useIncomeAction();

  const isEditing = !!incomeToEdit;

  const partners = useAppSelector((state) => state.partner.partners);

  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState<IIncome>({
    partnerId: isEditing ? incomeToEdit?.partnerId : "",
    dateOfAdmission: isEditing ? incomeToEdit?.dateOfAdmission : 0,
  });

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
    if (isEditing && incomeToEdit && incomeToEdit._id) {
      updateIncome({ id: incomeToEdit._id, updatedData: form }).then(() => {
        setLoadingSubmit(false);
        setEditingIncome && setEditingIncome(false);
      });
    } else {
      createNewIncome(form).then(() => {
        setLoadingSubmit(false);
      });

      setForm({
        partnerId: "",
        dateOfAdmission: 0,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {!isEditing ? "Crear un nuevo socio" : "Editar socio"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
          <div className="my-2 items-center grid gap-4 grid-cols-2">
            <label className="block mb-1 text-sm font-medium text-gray-900">
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
                  <option key={part.firstName} value={part.firstName}>
                    {part.firstName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Fecha
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="date"
              name="dateOfAdmission"
              placeholder="fecha de hoy"
              value={form.dateOfAdmission}
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
              {!isEditing ? " Añadir socio" : "Guardar cambios"}
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

export default FromIncome;
