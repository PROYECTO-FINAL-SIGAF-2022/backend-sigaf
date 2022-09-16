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

const router = Router();

router.get("/historiales", validateToken, getHistorialesMidd, getHistoriales);

router.get("/historiales/:id", validateToken, getHistorialMidd, getHistorialUnico);

router.post("/historiales", validateToken, postHistorialMidd, postHistorial);

router.put("/historiales/:id", validateToken, putHistorialMidd, updateHistorial);

router.delete("/historiales/:id", validateToken, deleteHistorialMidd, deleteHistorial);

export default router;
