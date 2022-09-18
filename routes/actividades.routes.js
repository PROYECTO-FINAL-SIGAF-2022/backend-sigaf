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
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";
// getActividades

const router = Router();

router.get("/actividades", validateToken, validarAccesoRutas, getActividadesMidd, getActividades);

router.get("/actividades/:id", validateToken, validarAccesoRutas, getActividadMidd, getActividadUnico);

router.post("/actividades", validateToken, validarAccesoRutas, postActividadesMidd, postActividad);

router.put("/actividades/:id", validateToken, validarAccesoRutas, putActividadesMidd, updateActividad);

router.delete("/actividades/:id", validateToken, validarAccesoRutas, deleteActividadesMidd, deleteActividad);

export default router;
