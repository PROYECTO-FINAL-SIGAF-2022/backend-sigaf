import { Router } from "express";
import {
  getAggParcelasCultivos,
  getAggParcelaCultivoUnico,
  postAggParcelaCultivo,
  updateAggParcCultela,
  deleteAggParcelaCultivo,
} from "../controllers/agregoParcelasCultivos.controller.js";

import validateToken from "../middlewares/validateToken.middleware.js";
import {
  getAgregoParcCultivosMidd, getAgregoParCultivoMidd, putAgregoParCultivoMidd, deleteAgregoParCultivoMidd, postAgregoParCultivoMidd,
} from "../middlewares/agregoParcelasCultivos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

// TODO : Faltan los middlewares

const router = Router();

router.get("/agregar-parcela-cultivos", validateToken, validarAccesoRutas, getAgregoParcCultivosMidd, getAggParcelasCultivos);

router.get("/agregar-parcela-cultivos/:id", validateToken, validarAccesoRutas, getAgregoParCultivoMidd, getAggParcelaCultivoUnico);

router.post("/agregar-parcela-cultivos", validateToken, validarAccesoRutas, postAgregoParCultivoMidd, postAggParcelaCultivo);

router.put("/agregar-parcela-cultivos/:id", validateToken, validarAccesoRutas, putAgregoParCultivoMidd, updateAggParcCultela);

router.delete("/agregar-parcela-cultivos/:id", validateToken, validarAccesoRutas, deleteAgregoParCultivoMidd, deleteAggParcelaCultivo);

export default router;
