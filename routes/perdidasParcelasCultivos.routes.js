import { Router } from "express";
import {
  getPerdidasParcelasCultivos,
  getPerdidaParcelaCultivoUnico,
  postPerdidaParcelaCultivo,
  updatePerdidaParcelaCultivo,
  deletePerdidaParcelaCultivo,
} from "../controllers/perdidasParcelasCultivos.controller.js";
import {
  deletePerdidaParCultivoMidd,
  getPerdidaParcCultivosMidd, getPerdidaParCultivoMidd, postPerdidaParCultivoMidd, putPerdidaParCultivoMidd,
} from "../middlewares/perdidasParcelasCultivos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/perdidas-parcelas-cultivos", validateToken, validarAccesoRutas, getPerdidaParcCultivosMidd, getPerdidasParcelasCultivos);

router.get("/perdidas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, getPerdidaParCultivoMidd, getPerdidaParcelaCultivoUnico);

router.post("/perdidas-parcelas-cultivos", validateToken, validarAccesoRutas, postPerdidaParCultivoMidd, postPerdidaParcelaCultivo);

router.put("/perdidas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, putPerdidaParCultivoMidd, updatePerdidaParcelaCultivo);

router.delete("/perdidas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, deletePerdidaParCultivoMidd, deletePerdidaParcelaCultivo);

export default router;
