import { Router } from "express";
import {
  deleteParcela,
  getParcelas,
  getParcelaUnico,
  postParcela,
  updateParcela,
} from "../controllers/parcela.controllers.js";
import {
  deleteParcelaMidd,
  getParcelaMidd, getParcelasMidd, postParcelasMidd, putParcelasMidd,
} from "../middlewares/parcelas.middlewares.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/parcelas", validateToken, validarAccesoRutas, getParcelasMidd, getParcelas);

router.get("/parcelas/:id", validateToken, validarAccesoRutas, getParcelaMidd, getParcelaUnico);

router.post("/parcelas", validateToken, validarAccesoRutas, postParcelasMidd, postParcela);

router.put("/parcelas/:id", validateToken, validarAccesoRutas, putParcelasMidd, updateParcela);

router.delete("/parcelas/:id", validateToken, validarAccesoRutas, deleteParcelaMidd, deleteParcela);

export default router;
