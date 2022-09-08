import { Router } from "express";
import {
  deleteActividad,
  getActividades,
  getActividadUnico,
  postActividad,
  updateActividad,
} from "../controllers/actividades.controllers.js";

import {
  deleteActividadesMidd,
  getActividadesMidd, getActividadMidd, postActividadesMidd, putActividadesMidd,
} from "../middlewares/actividades.middlewares.js";
import validateToken from "../middlewares/validateToken.middleware.js";
// getActividades

const router = Router();

router.get("/actividades", validateToken, getActividadesMidd, getActividades);

router.get("/actividades/:id", validateToken, getActividadMidd, getActividadUnico);

router.post("/actividades", validateToken, postActividadesMidd, postActividad);

router.put("/actividades/:id", validateToken, putActividadesMidd, updateActividad);

router.delete("/actividades/:id", validateToken, deleteActividadesMidd, deleteActividad);

export default router;
