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

router.get("/historiales/:id", getHistorialUnico);

router.post("/historiales", postHistorial);

router.put("/historiales/:id", updateHistorial);

router.delete("/historiales/:id", deleteHistorial);

export default router;
