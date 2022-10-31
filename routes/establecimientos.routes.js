import { Router } from "express";
import {
  deleteEstablecimiento,
  getEstablecimientos,
  getEstablecimientosUsuario,
  getEstablecimientoUnico,
  getEstablecimientoUsuario,
  getTokenEstablecimientoUsuario,
  getVerificarTokenEstablecimientoUsuario,
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
router.get("/establecimiento-usuario", validateToken, validarAccesoRutas, getEstablecimientosMidd, getEstablecimientoUsuario);

router.get("/establecimientos-usuarios", validateToken, validarAccesoRutas, getEstablecimientosMidd, getEstablecimientosUsuario);

router.get("/establecimientos-usuarios/:id", validateToken, validarAccesoRutas, getEstablecimientosMidd, getTokenEstablecimientoUsuario);

router.get("/verificar-token-establecimiento-usuario", validateToken, validarAccesoRutas, getEstablecimientosMidd, getVerificarTokenEstablecimientoUsuario);

router.get("/establecimientos/:id", validateToken, validarAccesoRutas, getEstablecimientoMidd, getEstablecimientoUnico);

router.post("/establecimientos", validateToken, validarAccesoRutas, postEstablecimientoMidd, postEstablecimiento);

router.put("/establecimientos/:id", validateToken, validarAccesoRutas, putEstablecimientoMidd, updateEstablecimiento);

router.delete("/establecimientos/:id", validateToken, validarAccesoRutas, deleteEstablecimientoMidd, deleteEstablecimiento);

export default router;
