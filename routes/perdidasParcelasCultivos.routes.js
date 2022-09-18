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
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/perdidas-parcelas-cultivos", validateToken, getPerdidaParcCultivosMidd, getPerdidasParcelasCultivos);

router.get("/perdidas-parcelas-cultivos/:id", validateToken, getPerdidaParCultivoMidd, getPerdidaParcelaCultivoUnico);

router.post("/perdidas-parcelas-cultivos", validateToken, postPerdidaParCultivoMidd, postPerdidaParcelaCultivo);

router.put("/perdidas-parcelas-cultivos/:id", validateToken, putPerdidaParCultivoMidd, updatePerdidaParcelaCultivo);

router.delete("/perdidas-parcelas-cultivos/:id", validateToken, deletePerdidaParCultivoMidd, deletePerdidaParcelaCultivo);

export default router;
