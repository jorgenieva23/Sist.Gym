import axios from "axios";
import { IPartner } from "../../utils/types";
import { useAppDispatch } from "../store";
import { getPartner, createPartner } from "../Slices/partnerSlice";

export const usePartnerAction = () => {
  const dispatch = useAppDispatch();

  const getAllPartner = async () => {
    try {
      const rawData = await axios.get(`/partner`);
      const response = rawData.data;
      dispatch(getPartner(response));
    } catch (error: any) {
      console.error("Error fetching partner data:", error.message);
    }
  };
  const createNewPartner = async (partner: IPartner) => {
    try {
      const rawData = await axios.post(`/partners/`, {
        firstName: partner.firstName,
        lastName: partner.lastName,
        dni: 0,
        address: partner.address,
        phone: 0,
        email: partner.email,
        picture: partner.picture,
        date: 0,
        datePhysicalAttitude: 0,
        medicalCoverage: partner.medicalCoverage,
        phoneEmergency: 0,
        phoneEmergencyName: partner.phoneEmergencyName,
      });
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
      const updatedPartner = await axios.put(`/partners/update/${_id}`, {
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
