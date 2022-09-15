import { Router } from "express";
import { loguearse, registrarse, getDataUser } from "../controllers/auth.controller.js";
import { postAuthLoginMidd, postAuthRegisterMidd } from "../middlewares/auth.middlewares.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.post("/login", postAuthLoginMidd, loguearse);
router.post("/registrarse", postAuthRegisterMidd, registrarse);

router.get("/data-User", validateToken, getDataUser);

export default router;
