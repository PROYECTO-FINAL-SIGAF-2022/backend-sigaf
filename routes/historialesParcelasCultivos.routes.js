import { Router } from "express";
import {
  deleteHistorial,
  getHistoriales,
  getHistorialUnico,
  postHistorial,
  updateHistorial,
} from "../controllers/historialesParcelasCultivos.controllers.js";
import validateToken from "../middlewares/validateToken.middleware.js";
import {
  getHistorialMidd, getHistorialesMidd, postHistorialMidd, putHistorialMidd, deleteHistorialMidd,
} from "../middlewares/historialesParcelasCultivos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

const router = Router();

router.get("/historiales", validateToken, validarAccesoRutas, getHistorialesMidd, getHistoriales);

router.get("/historiales/:id", validateToken, validarAccesoRutas, getHistorialMidd, getHistorialUnico);

router.post("/historiales", validateToken, validarAccesoRutas, postHistorialMidd, postHistorial);

router.put("/historiales/:id", validateToken, validarAccesoRutas, putHistorialMidd, updateHistorial);

router.delete("/historiales/:id", validateToken, validarAccesoRutas, deleteHistorialMidd, deleteHistorial);

export default router;
