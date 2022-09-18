import { Router } from "express";
import {
  getDetalleCampanias, getDetalleCampaniaUnico, postDetalleCampania, updateDetalleCampania, deleteDetalleCampania,
} from "../controllers/detalleCampanias.controller.js";

import {
  getDetalleCampaniasMidd,
  getDetalleCampaniaMidd,
  postDetalleCampaniasMidd,
  putDetalleCampaniasMidd,
  deleteCampaniasMidd,
} from "../middlewares/detalleCampanias.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/detalle-campanias", validateToken, validarAccesoRutas, getDetalleCampaniasMidd, getDetalleCampanias);

router.get("/detalle-campanias/:id", validateToken, validarAccesoRutas, getDetalleCampaniaMidd, getDetalleCampaniaUnico);

router.post("/detalle-campanias", validateToken, validarAccesoRutas, postDetalleCampaniasMidd, postDetalleCampania);

router.put("/detalle-campanias/:id", validateToken, validarAccesoRutas, putDetalleCampaniasMidd, updateDetalleCampania);

router.delete("/detalle-campanias/:id", validateToken, validarAccesoRutas, deleteCampaniasMidd, deleteDetalleCampania);

export default router;
