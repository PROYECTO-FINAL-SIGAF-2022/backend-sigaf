import { Router } from "express";
import {
  getParcelasCultivos,
  getParcelaCultivoUnico,
  postParcelaCultivo,
  updateParcelaCultivo,
  deleteParcelaCultivo,
  getParcelaCultivoByParcela,
  patchParcelaCultivo,
} from "../controllers/parcelasCultivos.controllers.js";
import {
  getParcelaCultivoMidd, getParcelaCultivosMidd, postParcelaCultivosMidd, updateParcelaCultivosMidd, deleteParcelaCultivosMidd, patchParcelaCultivosMidd,
} from "../middlewares/parcelasCultivos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/parcelas-cultivos", validateToken, validarAccesoRutas, getParcelaCultivosMidd, getParcelasCultivos);

router.get("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, getParcelaCultivoMidd, getParcelaCultivoUnico);

router.get("/parcelas-cultivos-by-parcela/:idCampania/:idParcela", validateToken, validarAccesoRutas, getParcelaCultivoByParcela);

router.post("/parcelas-cultivos", validateToken, validarAccesoRutas, postParcelaCultivosMidd, postParcelaCultivo);

router.put("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, updateParcelaCultivosMidd, updateParcelaCultivo);
router.patch("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, patchParcelaCultivosMidd, patchParcelaCultivo);

router.delete("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, deleteParcelaCultivosMidd, deleteParcelaCultivo);

export default router;
