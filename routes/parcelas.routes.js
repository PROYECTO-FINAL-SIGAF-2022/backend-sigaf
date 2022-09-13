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
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/parcelas", validateToken, getParcelasMidd, getParcelas);

router.get("/parcelas/:id", validateToken, getParcelaMidd, getParcelaUnico);

router.post("/parcelas", validateToken, postParcelasMidd, postParcela);

router.put("/parcelas/:id", validateToken, putParcelasMidd, updateParcela);

router.delete("/parcelas/:id", validateToken, deleteParcelaMidd, deleteParcela);

export default router;
