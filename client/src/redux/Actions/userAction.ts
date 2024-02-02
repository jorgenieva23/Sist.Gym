import axios from "axios";
import { useAppDispatch } from "../store";
import { getUser, createUser } from "../Slices/userSlice";
import { IUser } from "../../utils/types";

export const useUserAction = () => {
  const dispatch = useAppDispatch();

  const getAllUser = async () => {
    try {
      const rawData = await axios.get(`/user`);
      const response = rawData.data;
      dispatch(getUser(response));
    } catch (error: any) {
      console.error("Error fetching User data:", error.message);
    }
  };
  const createNewUser = async (user: IUser) => {
    try {
      const rawData = await axios.post(`/users/`, {
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
      });
      return dispatch(createUser(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return {
    getAllUser,
    createNewUser,
  };
};
