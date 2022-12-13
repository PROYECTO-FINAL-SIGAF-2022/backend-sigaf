import { Router } from "express";
import {
  deleteHistorial,
  getHistoriales,
  getHistorialParcelaCultivo,
  getHistorialUnico,
  postHistorial,
  updateHistorial,
  getHistorialesActivosInactivos
} from "../controllers/historialesParcelasCultivos.controllers.js";
import validateToken from "../middlewares/validateToken.middleware.js";
import {
  getHistorialMidd, getHistorialesMidd, postHistorialMidd, putHistorialMidd, deleteHistorialMidd, getHistorialParcelasCultivosMidd,
} from "../middlewares/historialesParcelasCultivos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

const router = Router();

router.get("/historiales", validateToken, validarAccesoRutas, getHistorialesMidd, getHistoriales);

router.get("/historiales-todos", validateToken, validarAccesoRutas, getHistorialesMidd, getHistorialesActivosInactivos);

router.get("/historiales/:id", validateToken, validarAccesoRutas, getHistorialMidd, getHistorialUnico);
router.get("/historiales-parcelas-cultivos/:id", validateToken, validarAccesoRutas, getHistorialParcelasCultivosMidd, getHistorialParcelaCultivo);

router.post("/historiales/:id", validateToken, validarAccesoRutas, postHistorialMidd, postHistorial);

router.put("/historiales/:id", validateToken, validarAccesoRutas, putHistorialMidd, updateHistorial);

router.delete("/historiales/:id", validateToken, validarAccesoRutas, deleteHistorialMidd, deleteHistorial);

export default router;
