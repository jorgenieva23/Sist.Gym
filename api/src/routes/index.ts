import express, { Router } from "express";

import partnerRouter from "./partnerRouter";
import usersRouter from "./usersRouter";
import rolesRouter from "./rolesRouter";
import incomeRouter from "./incomeRouter"
import statesRouter from "./statesRouter";

const router = Router();

router.use(express.json());

router.use("/partner", partnerRouter);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/income", incomeRouter)
router.use("/states", statesRouter)

export default router;
