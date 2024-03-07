import express, { Router } from "express";

import partnerRouter from "./partnerRouter";
import usersRouter from "./usersRouter";
import incomeRouter from "./incomeRouter";
import paymentRouter from "./paymentRouter";
import promotionRouter from "./promotionRouter";
import statesRouter from "./statesRouter";
import rolesRouter from "./rolesRouter";
import movementRouter from "./movementRouter";
import permissionRouter from "./permissionRouter";

const router = Router();

router.use(express.json());

router.use("/partner", partnerRouter);
router.use("/user", usersRouter);
router.use("/role", rolesRouter);
router.use("/income", incomeRouter);
router.use("/state", statesRouter);
router.use("/payment", paymentRouter);
router.use("/promotion", promotionRouter);
router.use("/movement", movementRouter);
router.use("/permission", permissionRouter);

export default router;
