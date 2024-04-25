import axios from "axios";
import { useAppDispatch } from "../hooks";
import {
  // loginSuccess,
  // logout,
  getUser,
  getSpecificUser,
  createUser,
  // searchUser,
  editUser,
  // deleteUser,
} from "../Slices/userSlice";
import { IUser } from "../../utils/types";

export const useUserAction = () => {
  const dispatch = useAppDispatch();
  const getAllUser = async () => {
    try {
      const rawData = await axios.get(`/user/all`);
      dispatch(getUser(rawData.data));
    } catch (error: any) {
      console.error("Error fetching User data:", error.message);
    }
  };
  const specificUser = async (id: IUser) => {
    try {
      const rawData = await axios.get(`/getUserId/${id}`);
      dispatch(getSpecificUser(rawData.data));
    } catch (error: any) {
      console.error("Error fetching User data:", error.message);
    }
  };
  const createNewUser = async (user: IUser) => {
    try {
      const data = {
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
        token: user.token,
        stateId: user.stateId,
        creatorId: user.creatorId,
      };
      const rawData = await axios.post(`/user/create`, data);
      dispatch(createUser(rawData.data));
      return rawData.data;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Failed to create user. Please try again later.");
    }
  };
  const updateUser = async (_id: string | null, updatedData: IUser) => {
    try {
      const updatedUser = await axios.put(`/user/update/${_id}`, {
        updatedData,
      });
      return dispatch(editUser(updatedUser.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const deleteUser = async (_id: IUser) => {
    try {
      const deleted = await axios.delete(`/delete/:${_id}`);
      return dispatch(getUser(deleted.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return {
    // authLogin,
    // authLogout,
    getAllUser,
    specificUser,
    createNewUser,
    updateUser,
    deleteUser,
  };
};
