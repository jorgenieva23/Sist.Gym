import cron from "node-cron";
import Partner from "./models/partner";
import Payment from "./models/payment";

export function cronJobs() {
  async function verifyPaymentsExpiredToday() {
    const currentDate = new Date();
    try {
      const expiredPartnersInfo = [];

      const expiredPaid = await Payment.find({
        dateTo: { $lte: currentDate },
      });
      if (!expiredPaid) {
        console.log("no hay pagos");
      }

      for (const checkPaid of expiredPaid) {
        await Payment.findOneAndUpdate(
          { _id: checkPaid._id },
          { stateId: "inactive" },
          { new: true }
        );

        const updatedPartner = await Partner.findOneAndUpdate(
          { firstName: checkPaid.partnerId },
          { stateId: "inactive" },
          { new: true }
        );

        expiredPartnersInfo.push({
          firstName: updatedPartner?.firstName,
          lastName: updatedPartner?.lastName,
          email: updatedPartner?.email,
        });
      }
      console.log("Proceso de verificación de pagos vencidos completado.");
      console.log("Socios cuya suscripción ha vencido:");
      console.log(expiredPartnersInfo);
    } catch (error) {
      console.error(`Error al verificar pagos vencidos: ${error}`);
    }
  }
  cron.schedule("0 0 * * *", () => {
    console.log("Ejecutando tareas diarias...");
    verifyPaymentsExpiredToday();
  });

  console.log("Tareas cron leídas.");
}
