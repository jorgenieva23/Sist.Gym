import React, { useState } from "react";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/hooks";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";
import { PiUserCirclePlusLight } from "react-icons/pi";

interface FormProps {
  incomeToEdit?: IIncome;
}
interface OptionType {
  value: string | undefined;
  label: string | number | undefined;
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
    creatorId: userAuth?.email,
    stateId: "active",
  });

  const options: OptionType[] = partners
    .filter((state) => state.stateId !== "inactive")
    .map((partner) => ({
      value: partner._id,
      label: `${partner.firstName} ${partner.lastName} - DNI: ${
        partner.dni
      } || ${partner.condition === "fit" ? " Apto" : "No apto "}`,
    }));

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      await createNewIncome(form as IIncome);
      console.log(form.creatorId);
      setForm({
        partnerId: "",
      });
      window.location.reload();
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
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
            <span className="items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md bg-transparent block mr-2 h-10 w-10">
              <PiUserCirclePlusLight className=" w-7 h-7 text-black" />
            </span>
            <Select
              className="rounded-lg border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm "
              name="partnerId"
              value={options
                .reverse()
                .find((option) => option.value === form.partnerId)}
              onChange={(selectedOption: OptionType | null) =>
                setForm({
                  ...form,
                  partnerId: selectedOption ? selectedOption.value : "",
                })
              }
              required
              options={options}
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
