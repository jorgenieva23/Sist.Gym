import express, { Router } from "express";

import partnerRouter from "./partnerRouter";
import usersRouter from "./usersRouter";
import incomeRouter from "./incomeRouter";
import paymentRouter from "./paymentRouter";
import promotionRouter from "./promotionRouter";
import statesRouter from "./statesRouter";
import rolesRouter from "./rolesRouter";

const router = Router();

router.use(express.json());

router.use("/partner", partnerRouter);
router.use("/user", usersRouter);
router.use("/role", rolesRouter);
router.use("/income", incomeRouter);
router.use("/state", statesRouter);
router.use("/payment", paymentRouter);
router.use("/promotion", promotionRouter);

export default router;
