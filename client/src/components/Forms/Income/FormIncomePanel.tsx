import React, { useState } from "react";
import Select from "react-select";
// import { ClipLoader } from "react-spinners";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/hooks";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";

const FormIncomePanel: React.FC = (): JSX.Element => {
  const { createNewIncome } = useIncomeAction();

  const partners = useAppSelector((state) => state.partner.partners);
  const useAuth = useAppSelector((state) => state.auth.userInfo);
  const creator = useAuth[0]?.email;
  console.log(creator);

  const [form, setForm] = useState<IIncome>({
    partnerId: "",
    creatorId: creator,
    stateId: "active",
  });

  interface OptionType {
    value: string | undefined;
    label: string | number | undefined;
  }

  const options: OptionType[] = partners.map((partner) => ({
    value: partner.firstName,
    label: partner.dni,
  }));

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNewIncome(form as IIncome);
      console.log(form.creatorId);
      setForm({
        partnerId: "",
        creatorId: creator,
        stateId: "active",
      });
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
    } finally {
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
          <label className="block w-96 mb-1 text-sm font-medium text-gray-900">
            Socio
          </label>
          <div className="flex">
            <Select
              className="rounded-lg border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              name="partnerId"
              value={options.find((option) => option.value === form.partnerId)}
              onChange={(selectedOption: OptionType | null) =>
                setForm({
                  ...form,
                  partnerId: selectedOption ? selectedOption.value : "",
                })
              }
              required
              options={options}
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
