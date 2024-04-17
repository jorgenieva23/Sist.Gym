import axios from "axios";
import { IPayments } from "../../utils/types";
import { useAppDispatch } from "../hooks";
import {
  getPayment,
  getSpecificPayment,
  PaymentGetStats,
  getHistoryPaymentDay,
  getHistoryPaymentMonth,
  createPayment,
  editPayment,
  deletePayment,
} from "../Slices/paymentSlice";

export const usePaymentAction = () => {
  const dispatch = useAppDispatch();

  const getAllPayment = async () => {
    try {
      const rawData = await axios.get(`/payment/allPayment`);
      const response = rawData.data;
      dispatch(getPayment(response));
    } catch (error: any) {
      console.error("Error fetching payment data:", error.message);
    }
  };
  const getAllExpiredPayment = async () => {
    try {
      const rawData = await axios.get(`/payment/allExpiredPayment`);
      const response = rawData.data;
      dispatch(PaymentGetStats(response));
    } catch (error: any) {
      console.error("Error fetching payment data:", error.message);
    }
  };
  const getAllPaymentForDay = async () => {
    try {
      const rawData = await axios.get(`/payment/partnerPaymentsDay`);
      const response = rawData.data;
      dispatch(getHistoryPaymentDay(response));
    } catch (error: any) {
      console.error("Error fetching payment data:", error.message);
    }
  };
  const getAllPaymentForMonth = async () => {
    try {
      const rawData = await axios.get(`/payment/partnerPaymentsMonth`);
      console.log(rawData.data);
      const response = rawData.data;
      dispatch(getHistoryPaymentMonth(response));
    } catch (error: any) {
      console.error("Error fetching payment data:", error.message);
    }
  };
  const getSpecificPaymentById = async (id: string) => {
    try {
      const rawData = await axios.get(`/payment/getById/${id}`);
      const response = rawData.data;
      dispatch(getSpecificPayment(response));
    } catch (error: any) {
      console.error("Error fetching specific payment data:", error.message);
    }
  };
  const createNewPayment = async (payment: IPayments) => {
    try {
      const rawData = await axios.post(`/payment/createPayment`, {
        amount: payment.amount,
        dateFrom: payment.dateFrom,
        promotionId: payment.promotionId,
        stateId: payment.stateId,
        creatorId: payment.creatorId,
        partnerId: payment.partnerId,
      });
      console.log(rawData.data, "hola");

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
      await axios.delete(`/payment/delete/${_id}`);
      dispatch(deletePayment(_id));
    } catch (error: any) {
      console.error("Error deleting payment:", error.message);
    }
  };
  return {
    getAllPayment,
    getAllExpiredPayment,
    getAllPaymentForDay,
    getAllPaymentForMonth,
    createNewPayment,
    updatePayment,
    getSpecificPaymentById,
    removePayment,
  };
};
