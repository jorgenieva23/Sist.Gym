import React, { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { usePartnerAction } from "../../../redux/Actions/partnerAction";
import { IPartner } from "../../../utils/types";
import { PiUserCirclePlusLight } from "react-icons/pi";

interface FormProps {
  partnerToEdit?: IPartner;
  setEditingPartner?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormPartners: React.FC<FormProps> = ({
  partnerToEdit,
  setEditingPartner,
}: FormProps): JSX.Element => {
  const { createNewPartner, updatePartner } = usePartnerAction();
  const partners = useAppSelector((state) => state.partner.partners);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = !!partnerToEdit;

  const [form, setForm] = useState<IPartner>({
    firstName: isEditing ? partnerToEdit?.firstName : "",
    lastName: isEditing ? partnerToEdit?.lastName : "",
    dni: isEditing ? partnerToEdit?.dni : 0,
    address: isEditing ? partnerToEdit?.address : "",
    phone: isEditing ? partnerToEdit?.phone : 0,
    email: isEditing ? partnerToEdit?.email : "",
    picture: isEditing ? partnerToEdit?.picture : "",
    // deleted: isEditing ? partnerToEdit?.deleted : null,
    date: isEditing ? partnerToEdit?.date : 0,
    datePhysicalAttitude: isEditing ? partnerToEdit?.datePhysicalAttitude : 0,
    medicalCoverage: isEditing ? partnerToEdit?.medicalCoverage : "",
    phoneEmergency: isEditing ? partnerToEdit?.phoneEmergency : 0,
    phoneEmergencyName: isEditing ? partnerToEdit?.phoneEmergencyName : "",
    // stateId: isEditing ? partnerToEdit?.stateId : null,
    // userId: isEditing ? partnerToEdit?.userId : null,
    // condition: isEditing ? partnerToEdit?.condition : null,
    // rol: isEditing ? partnerToEdit?.rol : null,
  });

  const validate = (form: IPartner): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};

    if (!form.firstName) {
      errors.firstName = "El socio debe tener un nombre";
    } else if (form.firstName.length < 1 || form.firstName.length > 25) {
      errors.firstName = "Nombre inválido";
    }

    if (!form.lastName) {
      errors.lastName = "El socio debe tener un apellido";
    } else if (form.lastName.length < 1 || form.lastName.length > 25) {
      errors.lastName = "Apellido inválido";
    }

    if (!form.dni) {
      errors.dni = "El socio debe tener un DNI";
    } else if (form.dni.toString().length !== 8) {
      errors.dni = "DNI inválido. Debe tener 8 dígitos.";
    }

    if (!form.address) {
      errors.address = "El socio debe tener una dirección";
    }

    if (!form.phone) {
      errors.phone = "El socio debe tener un teléfono";
    } else if (form.phone.toString().length !== 11) {
      errors.phone = "Teléfono inválido. Debe tener entre 10 y 11 dígitos.";
    }

    if (!form.email) {
      errors.email = "El socio debe tener un correo electrónico";
    } else {
      const existingPartner = partners.find(
        (e) => e.email.toLowerCase() === form.email.toLowerCase()
      );
      if (existingPartner && !partnerToEdit) {
        errors.email = `El socio con el correo ${form.email} ya existe.`;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
          errors.email = "Formato de correo electrónico inválido";
        }
      }
    }

    if (!form.picture) {
      errors.picture = "El socio debe tener una picture";
    }

    if (!form.date) {
      errors.date = "El socio debe tener una fecha";
    }

    if (!form.datePhysicalAttitude) {
      errors.datePhysicalAttitude =
        "El socio debe tener una fecha de actitud física";
    }

    if (!form.medicalCoverage) {
      errors.medicalCoverage = "El socio debe tener una cobertura médica";
    }

    if (!form.phoneEmergency) {
      errors.phoneEmergency = "El socio debe tener un teléfono de emergencia";
    } else if (form.phoneEmergency.toString().length !== 11) {
      errors.phoneEmergency =
        "Teléfono de emergencia inválido. Debe tener entre 10 y 11 dígitos.";
    }

    if (!form.phoneEmergencyName) {
      errors.phoneEmergencyName = "El socio debe tener un nombre";
    } else if (
      form.phoneEmergencyName.length < 1 ||
      form.phoneEmergencyName.length > 25
    ) {
      errors.phoneEmergencyName = "Nombre inválido";
    }

    // if (!form.stateId) {
    //   errors.stateId = "El socio debe tener un estado";
    // }

    // if (!form.userId) {
    //   errors.userId = "El socio debe tener un usuario asignado";
    // }

    // if (!form.condition) {
    //   errors.condition = "El socio debe tener una condición";
    // } else if (!["fit", "unfit"].includes(form.condition)) {
    //   errors.condition = "Condición inválida. Debe ser 'fit' o 'unfit'.";
    // }

    // if (!form.rol) {
    //   errors.rol = "El socio debe tener un rol asignado";
    // }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    if (isEditing && partnerToEdit && partnerToEdit._id) {
      updatePartner({ id: partnerToEdit._id, updatedData: form }).then(() => {
        setLoadingSubmit(false);
        setEditingPartner && setEditingPartner(false);
      });
    } else {
      createNewPartner(form).then(() => {
        setLoadingSubmit(false);
      });

      setForm({
        firstName: "",
        lastName: "",
        dni: 0,
        address: "",
        phone: 0,
        email: "",
        picture: "",
        // deleted: null,
        date: 0,
        datePhysicalAttitude: 0,
        medicalCoverage: "",
        phoneEmergency: 0,
        phoneEmergencyName: "",
        // stateId: null,
        // userId: null,
        // condition: null,
        // rol: null,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {!isEditing ? "Crear un nuevo socio" : "Editar banco"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="firstName"
            value={form.firstName}
            placeholder="Nombre del Socio"
            onChange={(e) => handleChange(e)}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
      </form>
    </div>
  );
};

export default FormPartners;
