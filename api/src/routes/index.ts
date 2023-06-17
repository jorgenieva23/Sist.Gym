import express, { Router } from "express";
import partnerRouter from "./partnerRouter";
import usersRouter from "./usersRouter";
import rolesRouter from "./rolesRouter"; // Corregir la importación aquí

const router = Router();

router.use(express.json());
router.use("/partner", partnerRouter);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);

export default router;




