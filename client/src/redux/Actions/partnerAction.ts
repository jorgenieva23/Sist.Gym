import axios from "axios";
import { useAppDispatch } from "../store";
import { getPartner } from "../Slices/partnerSlice";

export const usePartnerAction = () => {
  const dispatch = useAppDispatch();

  const getAllPartner = async () => {
    try {
      const rawData = await axios.get(`/partner`);
      const response = rawData.data;
      console.log(response, "hola");
      dispatch(getPartner(response));
    } catch (error: any) {
      console.error("Error fetching partner data:", error.message);
    }
  };
  return {
    getAllPartner,
  };
};
