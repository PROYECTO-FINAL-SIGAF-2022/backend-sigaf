import { Router } from "express";
import { loguearse, registrarse } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loguearse);
router.post("/registrarse", registrarse);

export default router;
