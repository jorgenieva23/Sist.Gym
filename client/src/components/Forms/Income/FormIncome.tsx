import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/hooks";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";
import { PiUserCirclePlusLight } from "react-icons/pi";

interface FormProps {
  incomeToEdit?: IIncome;
  setEditingIncome?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormIncome: React.FC<FormProps> = ({
  incomeToEdit,
}: FormProps): JSX.Element => {
  const { createNewIncome } = useIncomeAction();

  const partners = useAppSelector((state) => state.partner.partners);
  const userAuth = useAppSelector((state) => state.auth.userInfo);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isEditing = !!incomeToEdit;
  const [form, setForm] = useState<IIncome>({
    partnerId: isEditing ? incomeToEdit?.partnerId : "",
    creatorId: userAuth[0].email,
    stateId: "active",
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
    try {
      await createNewIncome(form as IIncome);
      console.log(form.creatorId);
      setForm({
        partnerId: "",
      });
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
        {!isEditing ? "Crear un nuevo socio" : "Editar socio"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
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
              {partners
                .filter((state) => state.stateId !== "inactive")
                .map((part) => (
                  <option
                    className="text-md font-medium text-gray-900"
                    key={part._id}
                    value={`${part.firstName}`}
                  >
                    {part.firstName} || {part.dni}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          {!loadingSubmit ? (
            <button
              className="px-4 py-2 rounded-none rounded-e-lg text-sm font-semibold text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-400"
              type="submit"
            >
              {!isEditing ? "Registrar" : "Guardar cambios"}
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

export default FormIncome;
