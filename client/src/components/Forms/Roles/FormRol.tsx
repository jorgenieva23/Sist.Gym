import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useRolesAction } from "../../../redux/Actions/rolesAction";
import { newIRol, IRoles } from "../../../utils/types";
import { ClipLoader } from "react-spinners";
import { PiCalendarLight } from "react-icons/pi";
import "../../../index.css";

interface FormProps {
  rolToEdit?: IRoles;
  setEditingRoles?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormRoles: React.FC<FormProps> = ({
  rolToEdit,
  setEditingRoles,
}: FormProps): JSX.Element => {
  const { createNewRol, updateRol, getAllPermission } = useRolesAction();
  const perm = useAppSelector((state) => state.roles.permissions);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const isEditing = !!rolToEdit;

  const [originalPermissions] = useState<string[]>(
    isEditing ? rolToEdit?.permissions : []
  );

  const [form, setForm] = useState<newIRol>({
    name: isEditing ? rolToEdit?.name : "",
    permissions: isEditing ? rolToEdit?.permissions || [] : [],
  });
  const validate = (form: newIRol): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};
    if (!form.name) {
      errors.name = "Debe haber un Precio";
    }
    if (!form.permissions) {
      errors.date = "Debe tener algun permiso";
    }

    return errors;
  };

  useEffect(() => {
    getAllPermission();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleTogglePermission = (permission: string) => {
    setForm((prevForm) => {
      const updatedPermissions = prevForm.permissions.includes(permission)
        ? prevForm.permissions.filter((p) => p !== permission)
        : [...prevForm.permissions, permission];
      return {
        ...prevForm,
        permissions: updatedPermissions,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      if (isEditing && rolToEdit && rolToEdit._id) {
        const addedPermissions = form.permissions.filter(
          (permission) => !originalPermissions.includes(permission)
        );

        const removedPermissions = originalPermissions.filter(
          (permission) => !form.permissions.includes(permission)
        );

        const permissionsToUpdate = [
          ...addedPermissions,
          ...removedPermissions,
        ];

        await updateRol(rolToEdit._id, permissionsToUpdate).then(() => {
          setEditingRoles && setEditingRoles(false);
          window.location.reload();
        });
      } else {
        await createNewRol(form as IRoles);
        setForm({
          name: "",
          permissions: [],
        });
        window.location.reload();
      }
    } catch (error: any) {
      console.error(error.message);
      alert("Ocurrió un error");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-auto">
      <h2 className="text-2xl font-semibold">
        {!isEditing ? "Crear un nuevo socio" : "Editar socio"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="flex flex-col mt-4">
          <label className="block mb-1 text-base font-medium text-gray-900">
            Roles Name
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiCalendarLight className="w-8 h-8 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-1.5"
              type="string"
              name="name"
              placeholder="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex mt-4 flex-col">
          <label className="mb-1 text-base font-medium text-gray-900">
            Permisos
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-72">
            {perm.map((part, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  value={part.name}
                  checked={form.permissions.includes(part.name)}
                  onChange={() => handleTogglePermission(part.name)}
                  className="mr-2"
                />
                {part.name}
              </div>
            ))}
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

export default FormRoles;
