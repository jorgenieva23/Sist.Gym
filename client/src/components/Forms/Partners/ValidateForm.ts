import { IPartner } from "../../../utils/types";

export const validate = (
  form: IPartner,
  partners: IPartner[],
  partnerToEdit?: IPartner
): { [key: string]: string } => {
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
  }
  // else if (form.phone.toString().length ) {
  //   errors.phone = "Teléfono inválido. Debe tener entre 10 y 11 dígitos.";
  // }

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
  }
  // else if (form.phoneEmergency.toString().length !== 11) {
  //   errors.phoneEmergency =
  //     "Teléfono de emergencia inválido. Debe tener entre 10 y 11 dígitos.";
  // }

  if (!form.phoneEmergencyName) {
    errors.phoneEmergencyName =
      "Debe tener un nombre de contacto de emergencia";
  } else if (
    form.phoneEmergencyName.length < 1 ||
    form.phoneEmergencyName.length > 25
  ) {
    errors.phoneEmergencyName = "Nombre inválido";
  }

  return errors;
};
