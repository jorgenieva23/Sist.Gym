import axios from "axios";
import { useAppDispatch } from "../store";
import { getUser, createUser } from "../Slices/userSlice";
import { IUser } from "../../utils/types";

export const useUserAction = () => {
  const dispatch = useAppDispatch();

  const getAllUser = async () => {
    try {
      const rawData = await axios.get(`/user/all`);
      const response = rawData.data;
      dispatch(getUser(response));
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
        creatorId: user.creatorId, // Puedes obtener estos datos del formulario o de otro lugar en tu aplicación
      };
      // Luego, envía la solicitud POST con todos los datos
      const rawData = await axios.post(`/user/create`, data);
      // Despacha la acción para actualizar el estado en Redux con el nuevo usuario creado
      dispatch(createUser(rawData.data));
      // Devuelve el nuevo usuario creado para que pueda ser utilizado en tu aplicación si es necesario
      return rawData.data;
    } catch (error: any) {
      console.error(error.message);
      // Maneja los errores de manera adecuada, ya sea lanzando un error o mostrando un mensaje al usuario
      throw new Error("Failed to create user. Please try again later.");
    }
  };
  const updateUser = async ({
    id: _id,
    updatedData,
  }: {
    id: string | null;
    updatedData: IUser;
  }) => {
    try {
      const updatedUser = await axios.put(`/user/update/${_id}`, {
        updatedData,
      });
      return dispatch(getUser(updatedUser.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return {
    getAllUser,
    createNewUser,
    updateUser,
  };
};
