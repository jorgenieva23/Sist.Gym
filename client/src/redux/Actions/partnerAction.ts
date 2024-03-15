import axios from "axios";
import { IPartner } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import { getPartner, createPartner } from "../Slices/partnerSlice";

export const usePartnerAction = () => {
  const dispatch = useAppDispatch();

  const getAllPartner = async () => {
    try {
      const rawData = await axios.get(`/partner/all`);
      const response = rawData.data;
      dispatch(getPartner(response));
    } catch (error: any) {
      console.error("Error fetching partner data:", error.message);
    }
  };
  const createNewPartner = async (partner: IPartner) => {
    try {
      const rawData = await axios.post(`/partner/create`, {
        firstName: partner.firstName,
        lastName: partner.lastName,
        dni: partner.dni,
        address: partner.address,
        phone: partner.phone,
        email: partner.email,
        picture: partner.picture,
        date: partner.date,
        datePhysicalAttitude: partner.datePhysicalAttitude,
        medicalCoverage: partner.medicalCoverage,
        phoneEmergency: partner.phoneEmergency,
        phoneEmergencyName: partner.phoneEmergencyName,
      });
      console.log(rawData, "hola");

      return dispatch(createPartner(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const updatePartner = async ({
    id: _id,
    updatedData,
  }: {
    id: string | null;
    updatedData: IPartner;
  }) => {
    try {
      const updatedPartner = await axios.put(`/partner/update/${_id}`, {
        updatedData,
      });
      return dispatch(getPartner(updatedPartner.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return {
    getAllPartner,
    createNewPartner,
    updatePartner,
  };
};
