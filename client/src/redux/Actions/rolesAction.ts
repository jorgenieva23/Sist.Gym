import axios from "axios";
// import { IRoles } from "../../utils/types";
import { useAppDispatch } from "../store";
import { getRoles } from "../Slices/rolesSlice";

export const useRolesAction = () => {
  const dispatch = useAppDispatch();

  const getAllRoles = async () => {
    try {
      const rawData = await axios.get(`/role/all`);
      const response = rawData.data;
      dispatch(getRoles(response));
    } catch (error: any) {
      console.error("Error fetching partner data:", error.message);
    }
  };
  return { getAllRoles };
};
