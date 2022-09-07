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

router.get("/parcelas/:id", getParcelaUnico);

router.post("/parcelas", postParcela);

router.put("/parcelas/:id", updateParcela);

router.delete("/parcelas/:id", deleteParcela);

export default router;
