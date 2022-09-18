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
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/establecimientos", validateToken, validarAccesoRutas, getEstablecimientosMidd, getEstablecimientos);

router.get("/establecimientos/:id", validateToken, validarAccesoRutas, getEstablecimientoMidd, getEstablecimientoUnico);

router.post("/establecimientos", validateToken, validarAccesoRutas, postEstablecimientoMidd, postEstablecimiento);

router.put("/establecimientos/:id", validateToken, validarAccesoRutas, putEstablecimientoMidd, updateEstablecimiento);

router.delete("/establecimientos/:id", validateToken, validarAccesoRutas, deleteEstablecimientoMidd, deleteEstablecimiento);

export default router;
