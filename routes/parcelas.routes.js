import { Router } from "express";
import {
  deleteParcela,
  getParcelas,
  getParcelaUnico,
  postParcela,
  updateParcela,
} from "../controllers/parcela.controllers.js";

const router = Router();

router.get("/parcelas", getParcelas);

router.get("/parcela/:id", getParcelaUnico);

router.post("/parcela", postParcela);

router.put("/parcela/:id", updateParcela);

router.delete("/parcela/:id", deleteParcela);

export default router;
