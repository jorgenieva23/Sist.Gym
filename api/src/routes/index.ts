import express, { Router } from "express";

import partnerRouter from "./partnerRouter";
import usersRouter from "./usersRouter";
import rolesRouter from "./rolesRouter";
import incomeRouter from "./incomeRouter"
import statesRouter from "./statesRouter";

const router = Router();

router.use(express.json());

router.use("/partner", partnerRouter);
router.use("/user", usersRouter);
router.use("/role", rolesRouter);
router.use("/income", incomeRouter)
router.use("/state", statesRouter)

export default router;
