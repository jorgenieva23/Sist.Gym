import React, { useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";
import { usePartnerAction } from "../../../redux/Actions/partnerAction";
import { IPartner } from "../../../utils/types";
import { ClipLoader } from "react-spinners";
import resizeImage from "../../../utils/resizeImage";
import {
  PiUserCirclePlusLight,
  PiCalendarLight,
  PiUserFocus,
  PiMapPinLight,
  PiWhatsappLogo,
  PiIdentificationCardLight,
  PiFirstAidKitLight,
  PiHeartbeatLight,
  PiEnvelope,
} from "react-icons/pi";
import { validate } from "./ValidateForm";

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
  const useAuth = useAppSelector((state) => state.auth.userInfo);
  const creator = useAuth?.email;

  const [errors] = useState<{ [key: string]: string }>({});

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const isEditing = !!partnerToEdit;

  const [form, setForm] = useState<IPartner>({
    firstName: isEditing ? partnerToEdit?.firstName : "",
    lastName: isEditing ? partnerToEdit?.lastName : "",
    dni: isEditing ? partnerToEdit?.dni : "",
    address: isEditing ? partnerToEdit?.address : "",
    phone: isEditing ? partnerToEdit?.phone : "",
    email: isEditing ? partnerToEdit?.email : "",
    picture: isEditing ? partnerToEdit?.picture : "",
    date: isEditing ? partnerToEdit?.date : "",
    datePhysicalAttitude: isEditing ? partnerToEdit?.datePhysicalAttitude : 0,
    medicalCoverage: isEditing ? partnerToEdit?.medicalCoverage : "",
    phoneEmergency: isEditing ? partnerToEdit?.phoneEmergency : "",
    phoneEmergencyName: isEditing ? partnerToEdit?.phoneEmergencyName : "",
    stateId: isEditing ? partnerToEdit?.stateId : "inactive",
    condition: isEditing ? partnerToEdit?.condition : "",
    deleted: isEditing ? partnerToEdit?.deleted : false,
    userId: creator,
    rol: "partner",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const errors = validate(form, partners, partnerToEdit);
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors);
      errorMessages.forEach((errorMessage) => toast.error(errorMessage));
      setLoadingSubmit(false);
      return;
    }

    try {
      if (isEditing && partnerToEdit && partnerToEdit._id) {
        await updatePartner(partnerToEdit._id, form).then(() => {
          setLoadingSubmit(false);
          setEditingPartner && setEditingPartner(false);
          window.location.reload();
        });
      } else {
        await createNewPartner(form as IPartner).then(() => {
          setLoadingSubmit(false);
          window.location.reload();
        });
        setForm({
          firstName: "",
          lastName: "",
          dni: 0,
          address: "",
          phone: 0,
          email: "",
          picture: "",
          date: 0,
          datePhysicalAttitude: 0,
          medicalCoverage: "",
          phoneEmergency: 0,
          phoneEmergencyName: "",
        });
      }
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
        <div className="my-2 items-center grid gap-4 grid-cols-2">
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
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
                placeholder="Ej. Juan"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.firstName && toast.info(errors.firstName)}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Apellido
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiUserCirclePlusLight className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="text"
                name="lastName"
                value={form.lastName}
                placeholder="Ej. Péres"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.lastName && toast.info(errors.lastName)}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Telefono
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiWhatsappLogo className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5"
                type="number"
                name="phone"
                value={form.phone}
                placeholder="Ej. 038165875"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.phone && toast.info(errors.phone)}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              DNI
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiIdentificationCardLight className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm p-2.5"
                maxLength={8}
                type="dni"
                name="dni"
                value={form.dni}
                placeholder="Ej. 36432567"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.dni && toast.info(errors.dni)}
          </div>
          {/* </div>

          <div className="my-4 flex items-center gap-4"> */}
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Fecha de nacimiento
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiCalendarLight className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5"
                type="date"
                name="date"
                value={form.date}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.date && toast.info(errors.date)}
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Correo Electrónico
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiEnvelope className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900
                   block flex-1 min-w-0 w-full text-sm p-2.5"
                type="email"
                name="email"
                value={form.email}
                placeholder="Ej. admin@gmail.com"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.email && toast.info(errors.email)}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Direccion
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <PiMapPinLight className="w-7 h-7 text-black" />
            </span>
            <input
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5"
              type="string"
              name="address"
              value={form.address}
              placeholder="B° Sur, calle Jujuy 123"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errors.date && toast.info(errors.address)}
        </div>

        <div className="flex flex-col my-2">
          <label className="block mb-1 text-sm font-medium text-gray-900">
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
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  const selectedFile = e.target.files[0];
                  try {
                    const resizedImage = await resizeImage(selectedFile);
                    setForm({
                      ...form,
                      picture: resizedImage,
                    });
                  } catch (error) {
                    console.error("Error resizing image:", error);
                  }
                }
              }}
            />
          </div>
        </div>
        <hr className="bg-gray-400 w-full h-0.5 mx-auto mt-8 border-0"></hr>
        <h1 className="text-2xl">Datos Medicos</h1>
        <div className="my-4 items-center grid gap-4 grid-cols-2">
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Vencimiento Ap.M.
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <PiHeartbeatLight className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="date"
                name="datePhysicalAttitude"
                value={form.datePhysicalAttitude}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.datePhysicalAttitude &&
              toast.info(errors.datePhysicalAttitude)}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Obra Social
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                <PiFirstAidKitLight className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="text"
                name="medicalCoverage"
                value={form.medicalCoverage}
                placeholder="Swiss Medical"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.medicalCoverage && toast.info(errors.medicalCoverage)}
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Telefono de Emergencia
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                <PiWhatsappLogo className="w-7 h-7 text-black" />
              </span>
              <input
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 "
                type="number"
                name="phoneEmergency"
                value={form.phoneEmergency}
                placeholder="Ej. 36432567"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.phoneEmergency && toast.info(errors.phoneEmergency)}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
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
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.phoneEmergencyName && toast.info(errors.phoneEmergencyName)}
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
