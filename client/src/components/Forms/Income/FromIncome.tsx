import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { IIncome } from "../../../utils/types";
import { useAppSelector } from "../../../redux/store";
import { useIncomeAction } from "../../../redux/Actions/incomeAction";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState<IIncome>({
    partnerId: isEditing ? incomeToEdit?.partnerId : "",
    dateOfAdmission: isEditing ? incomeToEdit?.dateOfAdmission : 0,
    stateId: isEditing ? incomeToEdit?.stateId : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        stateId: "",
      });
    }
  };

  return <div>hola</div>;
};
