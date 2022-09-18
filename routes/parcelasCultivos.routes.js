import { Router } from "express";
import {
  getParcelasCultivos,
  getParcelaCultivoUnico,
  postParcelaCultivo,
  updateParcelaCultivo,
  deleteParcelaCultivo,
} from "../controllers/parcelasCultivos.controllers.js";
import {
  getParcelaCultivoMidd, getParcelaCultivosMidd, postParcelaCultivosMidd, updateParcelaCultivosMidd, deleteParcelaCultivosMidd,
} from "../middlewares/parcelasCultivos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/parcelas-cultivos", validateToken, validarAccesoRutas, getParcelaCultivosMidd, getParcelasCultivos);

router.get("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, getParcelaCultivoMidd, getParcelaCultivoUnico);

router.post("/parcelas-cultivos", validateToken, validarAccesoRutas, postParcelaCultivosMidd, postParcelaCultivo);

router.put("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, updateParcelaCultivosMidd, updateParcelaCultivo);

router.delete("/parcelas-cultivos/:id", validateToken, validarAccesoRutas, deleteParcelaCultivosMidd, deleteParcelaCultivo);

export default router;
