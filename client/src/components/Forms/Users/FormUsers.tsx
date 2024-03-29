import React, { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { useUserAction } from "../../../redux/Actions/userAction";
import { IUser } from "../../../utils/types";
import { ClipLoader } from "react-spinners";

import {
  PiUserCirclePlusLight,
  PiPasswordBold,
  PiEnvelope,
  PiUserSwitchBold,
} from "react-icons/pi";

interface FormProps {
  userToEdit?: IUser;
  setEditingUser?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormUsers: React.FC<FormProps> = ({
  userToEdit,
  setEditingUser,
}: FormProps): JSX.Element => {
  const { createNewUser, updateUser } = useUserAction();

  const isEditing = !!userToEdit;

  const users = useAppSelector((state) => state.user.users);
  const roles = useAppSelector((state) => state.roles.roles);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [form, setForm] = useState<IUser>({
    name: isEditing ? userToEdit?.name : "",
    email: isEditing ? userToEdit?.email : "",
    password: isEditing ? userToEdit?.password : "",
    rol: isEditing ? userToEdit?.rol : "",
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    if (isEditing && userToEdit && userToEdit._id) {
      updateUser({ id: userToEdit._id, updatedData: form }).then(() => {
        setLoadingSubmit(false);
        setEditingUser && setEditingUser(false);
        window.location.reload();
      });
    } else {
      createNewUser(form).then(() => {
        setLoadingSubmit(false);
      });
      setForm({
        name: "",
        email: "",
        password: "",
        rol: "",
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {!isEditing ? "crear un usuario nuevo" : "editar usuario"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
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
              <PiPasswordBold className="w-7 h-7 text-black" />
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
              <PiUserSwitchBold className="w-7 h-7 text-black" />
            </span>
            <select
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              name="rol"
              value={form.rol}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="" >Selecciona el rol del usuario</option>
              {roles.map((rol) => (
                <option key={rol.name} value={rol.name} className=" text-lg">
                  {rol.name}
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
