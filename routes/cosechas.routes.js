import { Router } from "express";
import {
  deleteCosecha,
  getCosecha, getCosechas, postCosecha, putCosecha,
} from "../controllers/cosechas.controller.js";
import {
  deleteCosechaMidd,
  getCosechaMidd, getCosechasMidd, postCosechaMidd, putCosechaMidd,
} from "../middlewares/cosechas.middlewares .js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/cosechas", validateToken, validarAccesoRutas, getCosechasMidd, getCosechas);

router.get("/cosechas/:id", validateToken, validarAccesoRutas, getCosechaMidd, getCosecha);

router.post("/cosechas", validateToken, validarAccesoRutas, postCosechaMidd, postCosecha);

router.put("/cosechas/:id", validateToken, validarAccesoRutas, putCosechaMidd, putCosecha);

router.delete("/cosechas/:id", validateToken, validarAccesoRutas, deleteCosechaMidd, deleteCosecha);

// router.put("/cosechas/:id", validateToken, validarAccesoRutas, putMaquinasVenderMidd, putVenderMaquina);

export default router;
