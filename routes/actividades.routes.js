import { Router } from "express";
import {
  deleteActividad,
  getActividades,
  getActividadUnico,
  postActividad,
  updateActividad,
} from "../controllers/actividades.controllers.js";

const router = Router();

router.get("/actividades", getActividades);

router.get("/actividad/:id", getActividadUnico);

router.post("/actividad", postActividad);

router.put("/actividad/:id", updateActividad);

router.delete("/actividad/:id", deleteActividad);

export default router;
