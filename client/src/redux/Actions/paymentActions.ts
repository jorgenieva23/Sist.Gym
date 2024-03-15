import axios from "axios";
import { IPayments } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import {
  getPayment,
  getSpecificPayment,
  createPayment,
  editPayment,
  deletePayment,
} from "../Slices/paymentSlice";

export const usePaymentAction = () => {
  const dispatch = useAppDispatch();

  const getAllPayment = async () => {
    try {
      const rawData = await axios.get(`/payment/all`);
      const response = rawData.data;
      dispatch(getPayment(response));
    } catch (error: any) {
      console.error("Error fetching payment data:", error.message);
    }
  };
  const getSpecificPaymentById = async (id: string) => {
    try {
      const rawData = await axios.get(`/payment/${id}`);
      const response = rawData.data;
      dispatch(getSpecificPayment(response));
    } catch (error: any) {
      console.error("Error fetching specific payment data:", error.message);
    }
  };
  const createNewPayment = async (payment: IPayments) => {
    try {
      const rawData = await axios.post(`/payment/create`, {
        amount: payment.amount,
        total: payment.total,
        dateFrom: payment.dateFrom,
        dateTo: payment.dateTo,
        stateId: payment.stateId,
        deleted: payment.deleted,
        creatorId: payment.creatorId,
        partnerId: payment.partnerId,
      });
      console.log(rawData, "hola");

      return dispatch(createPayment(rawData.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const updatePayment = async (_id: string, updatedData: IPayments) => {
    try {
      const updatedPayment = await axios.put(
        `/payment/update/${_id}`,
        updatedData
      );
      return dispatch(editPayment(updatedPayment.data));
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const removePayment = async (_id: string) => {
    try {
      await axios.delete(`/payment/${_id}`);
      dispatch(deletePayment(_id));
    } catch (error: any) {
      console.error("Error deleting payment:", error.message);
    }
  };
  return {
    getAllPayment,
    createNewPayment,
    updatePayment,
    getSpecificPaymentById,
    removePayment,
  };
};
