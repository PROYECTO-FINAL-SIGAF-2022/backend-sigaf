import { Router } from "express";

import {
  getUnidadesMedidas,
  getUnidadMedidaUnico,
  postUnidadMedida,
  updateUnidadMedida,
  deleteUnidadMedida,
} from "../controllers/unidadesMedidas.controller.js";

import {
  getUnidadesMedidasMidd,
  getUnidadMedidaMidd,
  postUnidadMedidaMidd,
  putUnidadMedidaMidd,
  deleteUnidadMedidaMidd,
} from "../middlewares/unidadesMedidas.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos las unidades de medida
router.get("/unidades-medidas", validateToken, validarAccesoRutas, getUnidadesMedidasMidd, getUnidadesMedidas);

// Ruta que devuelve una sola unidad de medida
router.get("/unidades-medidas/:id", validateToken, validarAccesoRutas, getUnidadMedidaMidd, getUnidadMedidaUnico);

// Ruta que almacena nueva unidad de medida
router.post("/unidades-medidas", validateToken, validarAccesoRutas, postUnidadMedidaMidd, postUnidadMedida);

// Ruta que actualiza los datos de una unidad de medida
router.put("/unidades-medidas/:id", validateToken, validarAccesoRutas, putUnidadMedidaMidd, updateUnidadMedida);

// Ruta que elimina una unidad de medida
router.delete("/unidades-medidas/:id", validateToken, validarAccesoRutas, deleteUnidadMedidaMidd, deleteUnidadMedida);

export default router;
