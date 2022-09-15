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
  getHistorialMidd, getHistorialesMidd, postHostorialMidd, putHostorialMidd, deleteHostorialMidd,
} from "../middlewares/hostorialesParcelasCultivos.middleware.js";

const router = Router();

router.get("/historiales", validateToken, getHistorialesMidd, getHistoriales);

router.get("/historiales/:id", validateToken, getHistorialMidd, getHistorialUnico);

router.post("/historiales", validateToken, postHostorialMidd, postHistorial);

router.put("/historiales/:id", validateToken, putHostorialMidd, updateHistorial);

router.delete("/historiales/:id", validateToken, deleteHostorialMidd, deleteHistorial);

export default router;
