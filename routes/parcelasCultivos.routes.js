import { Router } from "express";
import {
  getParcelasCultivos,
  getParcelaCultivoUnico,
  postParcelaCultivo,
  updateParcelaCultivo,
  deleteParcelaCultivo,
} from "../controllers/parcelasCultivos.controllers.js";

const router = Router();

router.get("/parcelas-cultivos", getParcelasCultivos);

router.get("/parcela-cultivos/:id", getParcelaCultivoUnico);

router.post("/parcela-cultivos", postParcelaCultivo);

router.put("/parcela-cultivos/:id", updateParcelaCultivo);

router.delete("/parcela-cultivos/:id", deleteParcelaCultivo);

export default router;
