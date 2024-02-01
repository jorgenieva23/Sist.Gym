import axios from "axios";
import { useAppDispatch } from "../store";
import { getUser } from "../Slices/userSlice";

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
  return {
    getAllUser,
  };
};
