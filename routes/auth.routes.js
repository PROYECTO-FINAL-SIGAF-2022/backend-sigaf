import { Router } from "express";
import { loguearse, registrarse } from "../controllers/auth.controller.js";

const router = Router();

router.post("/api/login", loguearse);
router.post("/api/registrarse", registrarse);

export default router;
