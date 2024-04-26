import React, { useState } from "react";
import Select from "react-select";
import { useAppSelector } from "../../../redux/hooks";
import { useUserAction } from "../../../redux/Actions/userAction";
import { IUser } from "../../../utils/types";
import { ClipLoader } from "react-spinners";

import {
  PiUserCirclePlusLight,
  PiPassword,
  PiEnvelope,
  PiUserSwitch,
} from "react-icons/pi";

interface FormProps {
  userToEdit?: IUser;
  setEditingUser?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionType {
  value: string | undefined;
  label: string | number | undefined;
}

const FormUsers: React.FC<FormProps> = ({
  userToEdit,
  setEditingUser,
}: FormProps): JSX.Element => {
  const { createNewUser, updateUser } = useUserAction();

  const isEditing = !!userToEdit;

  const users = useAppSelector((state) => state.user.users);
  const roles = useAppSelector((state) => state.roles.roles);
  const auth = useAppSelector((state) => state.auth.userInfo);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState<IUser>({
    name: isEditing ? userToEdit?.name : "",
    email: isEditing ? userToEdit?.email : "",
    password: isEditing ? userToEdit?.password : "",
    rol: isEditing ? userToEdit?.rol : "",
    stateId: "active",
    token: "",
    creatorId: isEditing ? userToEdit?.creatorId : auth.email,
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setErrors({
      ...errors,
      [fieldName]: validateField(fieldName, fieldValue),
    });
  };

  const validateField = (fieldName: string, fieldValue: string): string => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!fieldValue) {
          errorMessage = "El socio debe tener un nombre";
        } else if (fieldValue.length < 1 || fieldValue.length > 25) {
          errorMessage = "Nombre inválido";
        }
        break;
      case "email":
        if (!fieldValue) {
          errorMessage = "El socio debe tener un correo electrónico";
        } else {
          const existingPartner = users.find(
            (e) => e.email.toLowerCase() === fieldValue.toLowerCase()
          );
          if (existingPartner && !userToEdit) {
            errorMessage = `El socio con el correo ${fieldValue} ya existe.`;
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(fieldValue)) {
              errorMessage = "Formato de correo electrónico inválido";
            }
          }
        }
        break;
      case "password":
        if (!fieldValue) {
          errorMessage = "El socio debe tener una contraseña";
        } else if (fieldValue.length < 6) {
          errorMessage = "La contraseña debe tener al menos 6 caracteres";
        }
        break;
      case "rol":
        if (!fieldValue) {
          errorMessage = "El socio debe tener un rol asignado";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const options: OptionType[] = roles.map((R) => ({
    value: R.name,
    label: `${R.name}`,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const errorMessage = validateField(fieldName, fieldValue);
    setForm({
      ...form,
      [fieldName]: fieldValue,
    });
    setErrors({
      ...errors,
      [fieldName]: errorMessage,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      if (isEditing && userToEdit && userToEdit._id) {
        updateUser(userToEdit._id, form).then(() => {
          setLoadingSubmit(false);
          setEditingUser && setEditingUser(false);
          window.location.reload();
        });
      } else {
        await createNewUser(form).then(() => {
          setLoadingSubmit(false);
          console.log(form.stateId);
        });
        setForm({
          name: "",
          email: "",
          password: "",
          rol: "",
        });
      }
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {!isEditing ? "crear un usuario nuevo" : "editar usuario"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4 w-80">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Nombre
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiUserCirclePlusLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="text"
              name="name"
              value={form.name}
              placeholder="Nombre"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Correo Electrónico
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiEnvelope className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="email"
              name="email"
              value={form.email}
              placeholder="Correo Electrónico"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Contraseña
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiPassword className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="password"
              id="psw"
              name="psw"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Rol
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiUserSwitch className="w-7 h-7 text-black" />
            </span>
            <Select
              className="rounded-lg border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm"
              name="partnerId"
              value={options.find((option) => option.value === form.rol)}
              onChange={(selectedOption: OptionType | null) =>
                setForm({
                  ...form,
                  rol: selectedOption ? selectedOption.value || "" : "",
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
            ;
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

export default FormUsers;
