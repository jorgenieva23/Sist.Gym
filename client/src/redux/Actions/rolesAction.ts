import axios from "axios";
import { IRoles } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import {
  getRoles,
  getPermission,
  getSpecificRole,
  createRoles,
  editRoles,
  deleteRoles,
} from "../Slices/rolesSlice";

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
  const getAllPermission = async () => {
    try {
      const rawData = await axios.get(`/permission/all`);
      const response = rawData.data;
      dispatch(getPermission(response));
    } catch (error: any) {
      console.error("Error fetching partner data:", error.message);
    }
  };
  const getSpecificRoleById = async (id: string) => {
    try {
      const rawData = await axios.get(`/role/getById/${id}`);
      const response = rawData.data;
      dispatch(getSpecificRole(response));
    } catch (error: any) {
      console.error("Error fetching specific promotion data:", error.message);
    }
  };
  const createNewRol = async (promotion: IRoles) => {
    try {
      const rawData = await axios.post(`/role/create`, {
        name: promotion.name,
        permissions: promotion.permissions,
      });
      return dispatch(createRoles(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const updateRol = async (_id: string, perm: string[]) => {
    try {
      const updatedRol = await axios.put(`/role/updatePermission/${_id}`, {
        perm,
      });
      return dispatch(editRoles(updatedRol.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const removeRol = async (_id: string) => {
    try {
      await axios.delete(`/role/delete/${_id}`);
      dispatch(deleteRoles(_id));
    } catch (error: any) {
      console.error("Error deleting promotion:", error.message);
    }
  };
  return {
    getAllRoles,
    getAllPermission,
    getSpecificRoleById,
    createNewRol,
    updateRol,
    removeRol,
  };
};
