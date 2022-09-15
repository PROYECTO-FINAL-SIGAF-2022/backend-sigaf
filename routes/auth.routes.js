import { Router } from "express";
import { loguearse, registrarse } from "../controllers/auth.controller.js";
import { postAuthLoginMidd, postAuthRegisterMidd } from "../middlewares/auth.middlewares.js";
import validateToken from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/login", postAuthLoginMidd, loguearse);
router.post("/registrarse", postAuthRegisterMidd, registrarse);

router.get("/dataUser", validateToken);

export default router;
