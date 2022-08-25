import { Router } from "express";
import {
  deleteHistorial,
  getHistoriales,
  getHistorialUnico,
  postHistorial,
  updateHistorial,
} from "../controllers/historialesParcelasCultivos.controllers.js";

const router = Router();

router.get("/historiales", getHistoriales);

router.get("/historial/:id", getHistorialUnico);

router.post("/historial", postHistorial);

router.put("/historial/:id", updateHistorial);

router.delete("/historial/:id", deleteHistorial);

export default router;
