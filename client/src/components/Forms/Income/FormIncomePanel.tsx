import React, { useState } from "react";
import Select from "react-select";
// import { ClipLoader } from "react-spinners";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/hooks";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";

interface OptionType {
  value: string | undefined;
  label: string | number | undefined;
}
const FormIncomePanel: React.FC = (): JSX.Element => {
  const { createNewIncome } = useIncomeAction();

  const partners = useAppSelector((state) => state.partner.partners);
  const userAuth = useAppSelector((state) => state.auth.userInfo);
  const creator = userAuth?.email;

  const [form, setForm] = useState<IIncome>({
    partnerId: "",
    creatorId: creator,
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
    try {
      const updatedForm = { ...form, creatorId: creator };
      await createNewIncome(updatedForm as IIncome);
      console.log(updatedForm.creatorId);
      setForm({
        partnerId: "",
        creatorId: creator,
        stateId: "active",
      });
      window.location.reload();
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
          <div className="flex">
            <Select
              className="rounded-lg border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
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
          <button
            className="px-4 py-2 rounded-none rounded-e-lg text-sm font-semibold text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md hover:bg-gray-400"
            type="submit"
          >
            "Registrar"
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormIncomePanel;
