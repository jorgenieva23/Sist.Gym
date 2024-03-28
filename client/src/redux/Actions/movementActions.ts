import axios from "axios";
// import { IMovement } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import {
  getMovement,
  // fetchMovement,
  // editMovement,
} from "../Slices/movementSlice";

export const useMovementAction = () => {
  const dispatch = useAppDispatch();

  const getAllMovement = async () => {
    try {
      const rawData = await axios.get(`/movement/all`);
      const response = rawData.data;
      dispatch(getMovement(response));
    } catch (error: any) {
      console.error("Error fetching movement data:", error.message);
    }
  };
  // const getSpecificMovementById = async (id: string) => {
  //   try {
  //     const rawData = await axios.get(`/movement/getById/${id}`);
  //     const response = rawData.data;
  //     dispatch(fetchMovement(response));
  //   } catch (error: any) {
  //     console.error("Error fetching specific movement data:", error.message);
  //   }
  // };
  // const updateMovement = async (_id: string, updatedData: IMovement) => {
  //   try {
  //     const updatedMovement = await axios.put(
  //       `/movement/update/${_id}`,
  //       updatedData
  //     );
  //     return dispatch(editMovement(updatedMovement.data));
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };

  return {
    getAllMovement,
    // updateMovement,
    // getSpecificMovementById,
  };
};
