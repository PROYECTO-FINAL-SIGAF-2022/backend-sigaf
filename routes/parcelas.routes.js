import { Router } from "express";
import {
  deleteParcela,
  getParcelas,
  getParcelaUnico,
  postParcela,
  updateParcela,
} from "../controllers/parcela.controllers.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/parcelas", validateToken, getParcelas);

router.get("/parcelas/:id", validateToken, getParcelaUnico);

router.post("/parcelas", validateToken, postParcela);

router.put("/parcelas/:id", validateToken, updateParcela);

router.delete("/parcelas/:id", validateToken, deleteParcela);

export default router;
