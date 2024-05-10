import axios from "axios";
import { IPartner } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import {
  getPartner,
  getSpecificPartner,
  clearSpecificPartner,
  createPartner,
  // searchPartners,
  editPartner,
  getHistory,
  deletePartners,
} from "../Slices/partnerSlice";

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
  const getSpecificPartnerById = async (_id: string) => {
    try {
      const rawData = await axios.get(`/partner/getById/${_id}`);
      const response = rawData.data;
      dispatch(getSpecificPartner(response));
    } catch (error: any) {
      console.error("Error fetching specific partner data:", error.message);
    }
  };
  const getHistoryIncomePartner = async (partnerId: string) => {
    try {
      const rawData = await axios.get(
        `/income/allIncomeByPartnerId/${partnerId}`
      );
      const response = rawData.data.result;
      dispatch(getHistory(response));
    } catch (error: any) {
      console.error("Error fetching specific partner data:", error.message);
    }
  };
  const clearSpecificPartnerById = () => {
    try {
      return dispatch(clearSpecificPartner());
    } catch (error) {}
  };
  const createNewPartner = async (partner: IPartner) => {
    try {
      console.log(partner);
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
        stateId: partner.stateId,
        deleted: partner.deleted,
        userId: partner.userId,
        condition: partner.condition,
        rol: partner.rol,
      });
      return dispatch(createPartner(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const updatePartner = async (_id: string | null, updatedData: IPartner) => {
    try {
      const updatedPartner = await axios.put(
        `/partner/update/${_id}`,
        updatedData
      );
      console.log(updatedPartner.data.picture);
      return dispatch(editPartner(updatedPartner.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const toggleDeleted = async (_id: string) => {
    try {
      const rawData = await axios.get(`/partner/getById/${_id}`);
      const partner = rawData.data;
      partner.deleted = !partner.deleted;
      // Cambiar el estado de 'active'
      partner.stateId = partner.deleted ? "suspend" : "inactive";
      const updatedPartner = await axios.put(`/partner/update/${_id}`, partner);
      dispatch(editPartner(updatedPartner.data));
      window.location.reload();
    } catch (error: any) {
      console.error("Error updating partner data:", error.message);
    }
  };
  const removePartner = async (_id: string) => {
    try {
      await axios.delete(`/partner/delete/${_id}`);
      dispatch(deletePartners(_id));
    } catch (error: any) {
      console.error("Error deleting promotion:", error.message);
    }
  };

  return {
    getAllPartner,
    getSpecificPartnerById,
    clearSpecificPartnerById,
    createNewPartner,
    updatePartner,
    getHistoryIncomePartner,
    toggleDeleted,
    removePartner,
  };
};
