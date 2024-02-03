import React, { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { usePartnerAction } from "../../../redux/Actions/partnerAction";
import { IPartner } from "../../../utils/types";
import { ClipLoader } from "react-spinners";
import resizeImage from "../../../utils/resizeImage";
import {
  PiUserCirclePlusLight,
  PiCalendarBold,
  PiUserFocus,
  PiMapPinBold,
  PiWhatsappLogo,
  PiIdentificationCardBold,
  PiFirstAidKitBold,
  PiHeartbeatBold,
  PiEnvelope,
} from "react-icons/pi";

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
    picture: isEditing ? partnerToEdit?.picture : null,
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
        picture: null,
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
        {!isEditing ? "Crear un nuevo socio" : "Editar socio"}
      </h2>
      <form onSubmit={handleFormSubmit} className="max-w mx-auto">
        <div className="mb-4">
          <div className="my-4 items-center grid gap-4 grid-cols-2">
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Nombre
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                  <PiUserCirclePlusLight className="w-7 h-7 text-black" />
                </span>
                <input
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5  "
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  placeholder="Nombre"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              {/* {errors.firstName && (
                <div className="error fl">{errors.firstName}</div>
              )} */}
            </div>

            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Apellido
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                  <PiUserCirclePlusLight className="w-7 h-7 text-black" />
                </span>
                <input
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-90 block flex-1 min-w-0 w-full text-sm p-2.5 "
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  placeholder="Apellido del Socio"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {/* {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )} */}
            </div>

            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Telefono
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                  <PiWhatsappLogo className="w-7 h-7 text-black" />
                </span>
                <input
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                  type="numb"
                  name="phone"
                  value={form.phone}
                  placeholder="Telefono"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {/* {errors.phone && <div className="error">{errors.phone}</div>} */}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                DNI
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                  <PiIdentificationCardBold className="w-7 h-7 text-black" />
                </span>
                <input
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm p-2.5 "
                  maxLength={8}
                  type="numb"
                  name="dni"
                  value={form.dni}
                  placeholder="Apellido del Socio"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {/* {errors.dni && <div className="error">{errors.dni}</div>} */}
            </div>
            {/* </div>

          <div className="my-4 flex items-center gap-4"> */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Fecha de nacimiento
              </label>
              <div className="flex">
                <span
                  className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md
                "
                >
                  <PiCalendarBold className="w-7 h-7 text-black" />
                </span>
                <input
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5
                   "
                  type="date"
                  name="date"
                  value={form.date}
                  placeholder="Segundo Nombre"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {/* {errors.date && <div className="error">{errors.date}</div>} */}
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Correo Electrónico
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                  <PiEnvelope className="w-7 h-7 text-black" />
                </span>
                <input
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900
                   block flex-1 min-w-0 w-full text-sm p-2.5 
                 "
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Correo Electrónico"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              {errors.email && <div className="error fl">{errors.email}</div>}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Direccion
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiMapPinBold className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="string"
              name="address"
              value={form.address}
              placeholder="Direccion del usuario"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {errors.date && <div className="error">{errors.address}</div>} */}
        </div>

        <div className="flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Foto
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiUserFocus className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
              type="file"
              name="imageFileOrder"
              accept=".jpeg, .jpg, .png, .webp, .svg"
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files[0]) {
                  try {
                    const resizedImage = await resizeImage(
                      event.target.files[0]
                    );
                    setForm({
                      ...form,
                      picture: resizedImage,
                    });
                  } catch (error) {
                    console.error("Error resizing image:", error);
                  }
                }
                handleChange(event);
              }}
            />
          </div>
          {/* {errors.date && (
                  <div className="error">{errors.date}</div>
                )} */}
        </div>

        <hr className="bg-gray-400 w-full h-0.5 mx-auto mt-8 border-0"></hr>
        <h1 className="text-2xl">Datos Medicos</h1>
        <div className="my-4 items-center grid gap-4 grid-cols-2">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Vencimiento Ap.M.
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiHeartbeatBold className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="date"
                name="date"
                value={form.datePhysicalAttitude}
                placeholder="Segundo Nombre"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* {errors.date && (
              <div className="error">{errors.datePhysicalAttitude}</div>
            )} */}
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Obra Social
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                <PiFirstAidKitBold className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="text"
                name="medicalCoverage"
                value={form.medicalCoverage}
                placeholder="Obra social"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* {errors.lastName && (
              <div className="error">{errors.medicalCoverage}</div>
            )} */}
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Telefono de Emergencia
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                <PiWhatsappLogo className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="numb"
                name="phoneEmergency"
                value={form.phoneEmergency}
                placeholder="Telefono"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* {errors.firstName && (
              <div className="error">{errors.phoneEmergency}</div>
            )} */}
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nombre de contacto
            </label>
            <div className="flex">
              <span
                className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md
               dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              >
                <PiUserCirclePlusLight className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="text"
                name="phoneEmergencyName"
                value={form.phoneEmergencyName}
                placeholder="Nombre de contacto"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* {errors.lastName && (
              <div className="error">{errors.phoneEmergencyName}</div>
            )} */}
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

export default FormPartners;
