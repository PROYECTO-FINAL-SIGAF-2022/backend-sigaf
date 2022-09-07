import { Router } from "express";
import {
  deleteEstablecimiento,
  getEstablecimientos,
  getEstablecimientoUnico,
  postEstablecimiento,
  updateEstablecimiento,
} from "../controllers/establecimiento.controllers.js";
import {
  deleteEstablecimientoMidd,
  getEstablecimientoMidd, getEstablecimientosMidd, postEstablecimientoMidd, putEstablecimientoMidd,
} from "../middlewares/establecimientos.middlewares.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/establecimientos", validateToken, getEstablecimientosMidd, getEstablecimientos);

router.get("/establecimientos/:id", validateToken, getEstablecimientoMidd, getEstablecimientoUnico);

router.post("/establecimientos", validateToken, postEstablecimientoMidd, postEstablecimiento);

router.put("/establecimientos/:id", validateToken, putEstablecimientoMidd, updateEstablecimiento);

router.delete("/establecimientos/:id", validateToken, deleteEstablecimientoMidd, deleteEstablecimiento);

export default router;
