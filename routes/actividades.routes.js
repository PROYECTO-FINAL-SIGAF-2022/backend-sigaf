import { Router } from "express";
import {
  deleteActividad,
  getActividades,
  getActividadUnico,
  postActividad,
  updateActividad,
} from "../controllers/actividades.controllers.js";

import {validadorDeCampos} from '../middlewares/actividades.middlewares.js'

const router = Router();

router.get("/actividades", getActividades);

router.get("/actividad/:id", getActividadUnico);

router.post("/actividad", validadorDeCampos, postActividad);

router.put("/actividad/:id", updateActividad);

router.delete("/actividad/:id", deleteActividad);

export default router;
