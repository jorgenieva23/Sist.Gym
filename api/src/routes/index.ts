import {Router} from "express";
import partnerRouter from "./partnerRouter";
import usersRouter from "./usersRouter";
const router = Router();

router.use("/partner", partnerRouter)
router.use("/users", usersRouter)


export default router;




